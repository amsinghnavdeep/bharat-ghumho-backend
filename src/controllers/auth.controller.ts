import { createPublicKey } from "node:crypto";
import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { prisma } from "@/config/database";
import { notificationService } from "@/services/notification.service";
import { ConflictError, BadRequestError, UnauthorizedError } from "@/utils/errors";
import { validators } from "@/utils/validators";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

type JwtPurpose = "email-verify" | "password-reset";
type AppleJwk = {
  kty: string;
  kid: string;
  use: string;
  alg: string;
  n: string;
  e: string;
};

function getPrismaClient() {
  if (!prisma) {
    throw new BadRequestError("Database connection unavailable");
  }
  return prisma;
}

function parseDurationMs(duration: string): number {
  const value = duration.trim();
  const match = /^(\d+)([smhd])$/.exec(value);
  if (!match) {
    return 30 * 24 * 60 * 60 * 1000;
  }
  const amount = Number(match[1]);
  const unit = match[2];
  if (unit === "s") return amount * 1000;
  if (unit === "m") return amount * 60 * 1000;
  if (unit === "h") return amount * 60 * 60 * 1000;
  return amount * 24 * 60 * 60 * 1000;
}

function getClientInfo(req: Request): { userAgent?: string; ipAddress?: string } {
  return {
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip
  };
}

export function generateAccessToken(userId: string): string {
  return jwt.sign({ userId, type: "access" }, process.env.JWT_SECRET ?? "", {
    expiresIn: process.env.JWT_EXPIRES_IN ?? "15m"
  });
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId, type: "refresh" }, process.env.JWT_REFRESH_SECRET ?? "", {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "30d"
  });
}

function generatePurposeToken(userId: string, purpose: JwtPurpose, expiresIn: string): string {
  return jwt.sign({ userId, purpose }, process.env.JWT_SECRET ?? "", { expiresIn });
}

function sanitizeUser<T extends { passwordHash?: string | null }>(user: T): Omit<T, "passwordHash"> {
  const { passwordHash: _passwordHash, ...sanitized } = user;
  return sanitized;
}

async function createSession(userId: string, refreshToken: string, req: Request): Promise<void> {
  const db = getPrismaClient();
  const refreshExpiry = parseDurationMs(process.env.JWT_REFRESH_EXPIRES_IN ?? "30d");
  const { userAgent, ipAddress } = getClientInfo(req);

  await db.session.create({
    data: {
      userId,
      refreshToken,
      userAgent,
      ipAddress,
      expiresAt: new Date(Date.now() + refreshExpiry)
    }
  });
}

async function issueAuthResponse(
  userId: string,
  req: Request
): Promise<{ accessToken: string; refreshToken: string }> {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  await createSession(userId, refreshToken, req);
  return { accessToken, refreshToken };
}

function verifyPurposeToken(token: string, expectedPurpose: JwtPurpose): JwtPayload {
  const payload = jwt.verify(token, process.env.JWT_SECRET ?? "") as JwtPayload;
  if (payload.purpose !== expectedPurpose) {
    throw new BadRequestError("Invalid token purpose");
  }
  return payload;
}

async function verifyAppleIdToken(idToken: string): Promise<{
  email?: string;
  sub: string;
}> {
  const decoded = jwt.decode(idToken, { complete: true });
  if (!decoded || typeof decoded === "string" || !decoded.header.kid) {
    throw new UnauthorizedError("Invalid Apple token");
  }

  const appleKeysResponse = await fetch("https://appleid.apple.com/auth/keys");
  if (!appleKeysResponse.ok) {
    throw new UnauthorizedError("Unable to verify Apple token");
  }
  const keySet = (await appleKeysResponse.json()) as { keys: AppleJwk[] };
  const matchingKey = keySet.keys.find((key) => key.kid === decoded.header.kid);
  if (!matchingKey) {
    throw new UnauthorizedError("Apple public key not found");
  }

  const publicKey = createPublicKey({ key: matchingKey, format: "jwk" }).export({
    type: "spki",
    format: "pem"
  });

  const payload = jwt.verify(idToken, publicKey, {
    algorithms: ["RS256"],
    issuer: "https://appleid.apple.com",
    audience: process.env.APPLE_CLIENT_ID
  }) as JwtPayload;

  return {
    email: typeof payload.email === "string" ? payload.email : undefined,
    sub: String(payload.sub)
  };
}

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, firstName, lastName, phone } = req.body as {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone?: string;
    };

    if (!validators.auth.isStrongPassword(password)) {
      throw new BadRequestError("Password must include upper/lowercase, number, and special character");
    }

    const db = getPrismaClient();
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictError("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: { email, passwordHash, firstName, lastName, phone }
    });

    const verificationToken = generatePurposeToken(user.id, "email-verify", "24h");
    await notificationService.sendEmailVerificationEmail(email, verificationToken);

    const { accessToken, refreshToken } = await issueAuthResponse(user.id, req);
    res.status(201).json({
      success: true,
      data: {
        user: sanitizeUser(user),
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const db = getPrismaClient();
    const user = await db.user.findUnique({ where: { email } });

    if (!user?.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const { accessToken, refreshToken } = await issueAuthResponse(user.id, req);

    res.json({
      success: true,
      data: {
        user: sanitizeUser(user),
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken: rawRefreshToken } = req.body as { refreshToken: string };
    const decoded = jwt.verify(rawRefreshToken, process.env.JWT_REFRESH_SECRET ?? "") as JwtPayload;
    if (decoded.type !== "refresh" || typeof decoded.userId !== "string") {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const db = getPrismaClient();
    const existingSession = await db.session.findUnique({
      where: { refreshToken: rawRefreshToken }
    });
    if (!existingSession) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    await db.session.delete({ where: { id: existingSession.id } });
    const tokens = await issueAuthResponse(decoded.userId, req);

    res.json({
      success: true,
      data: tokens
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const db = getPrismaClient();
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedError("Access token required");
    }

    const tokenToDelete = (req.body as { refreshToken?: string } | undefined)?.refreshToken;
    if (tokenToDelete) {
      await db.session.deleteMany({
        where: { userId, refreshToken: tokenToDelete }
      });
    } else {
      await db.session.deleteMany({ where: { userId } });
    }

    res.json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body as { email: string };
    const db = getPrismaClient();
    const user = await db.user.findUnique({ where: { email } });

    if (user) {
      const token = generatePurposeToken(user.id, "password-reset", "1h");
      const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
      await notificationService.sendPasswordResetEmail(email, resetUrl);
    }

    res.json({
      success: true,
      message: "If that email exists, a reset link has been sent"
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token, newPassword } = req.body as { token: string; newPassword: string };
    if (!validators.auth.isStrongPassword(newPassword)) {
      throw new BadRequestError("Password must include upper/lowercase, number, and special character");
    }

    const payload = verifyPurposeToken(token, "password-reset");
    const userId = String(payload.userId);
    const db = getPrismaClient();
    const passwordHash = await bcrypt.hash(newPassword, 12);

    await db.user.update({
      where: { id: userId },
      data: { passwordHash }
    });
    await db.session.deleteMany({ where: { userId } });

    res.json({
      success: true,
      message: "Password reset successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.body as { token: string };
    const payload = verifyPurposeToken(token, "email-verify");
    const userId = String(payload.userId);

    const db = getPrismaClient();
    await db.user.update({
      where: { id: userId },
      data: { isEmailVerified: true }
    });

    res.json({
      success: true,
      message: "Email verified successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { idToken } = req.body as { idToken: string };
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    if (!payload?.sub || !payload.email) {
      throw new UnauthorizedError("Invalid Google token payload");
    }

    const db = getPrismaClient();
    let user = await db.user.findFirst({
      where: { oauthProvider: "google", oauthId: payload.sub }
    });

    if (!user) {
      const existingByEmail = await db.user.findUnique({ where: { email: payload.email } });
      if (existingByEmail) {
        user = await db.user.update({
          where: { id: existingByEmail.id },
          data: {
            oauthProvider: "google",
            oauthId: payload.sub,
            avatar: payload.picture ?? existingByEmail.avatar,
            isEmailVerified: true
          }
        });
      } else {
        const [firstName, ...lastNameParts] = (payload.name ?? "").split(" ");
        user = await db.user.create({
          data: {
            email: payload.email,
            firstName: firstName || "Google",
            lastName: lastNameParts.join(" ") || "User",
            avatar: payload.picture,
            oauthProvider: "google",
            oauthId: payload.sub,
            isEmailVerified: true
          }
        });
      }
    }

    const tokens = await issueAuthResponse(user.id, req);
    res.json({
      success: true,
      data: {
        user: sanitizeUser(user),
        ...tokens
      }
    });
  } catch (error) {
    next(error);
  }
};

export const appleAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { idToken, firstName, lastName } = req.body as {
      idToken: string;
      firstName?: string;
      lastName?: string;
    };
    const applePayload = await verifyAppleIdToken(idToken);
    const db = getPrismaClient();

    let user = await db.user.findFirst({
      where: { oauthProvider: "apple", oauthId: applePayload.sub }
    });

    if (!user) {
      if (applePayload.email) {
        const existingByEmail = await db.user.findUnique({ where: { email: applePayload.email } });
        if (existingByEmail) {
          user = await db.user.update({
            where: { id: existingByEmail.id },
            data: { oauthProvider: "apple", oauthId: applePayload.sub, isEmailVerified: true }
          });
        } else {
          user = await db.user.create({
            data: {
              email: applePayload.email,
              firstName: firstName ?? "Apple",
              lastName: lastName ?? "User",
              oauthProvider: "apple",
              oauthId: applePayload.sub,
              isEmailVerified: true
            }
          });
        }
      } else {
        throw new BadRequestError("Apple email is required for first login");
      }
    }

    const tokens = await issueAuthResponse(user.id, req);
    res.json({
      success: true,
      data: {
        user: sanitizeUser(user),
        ...tokens
      }
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  register,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail,
  googleAuth,
  appleAuth
};
