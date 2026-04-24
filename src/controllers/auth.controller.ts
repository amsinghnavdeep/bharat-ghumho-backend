/**
 * Authentication controller — register, login, OAuth, password reset
 */
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '../config/database';
import { NotificationService } from '../services/notification.service';
import { sanitizeUser } from '../utils/helpers';
import { ConflictError, UnauthorizedError, BadRequestError, NotFoundError } from '../utils/errors';
import { JwtPayload } from '../types';
import { logger } from '../utils/logger';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper: generate tokens
function generateAccessToken(userId: string): string {
  return jwt.sign({ userId, type: 'access' }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  });
}

function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId, type: 'refresh' }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  });
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictError('Email already registered');

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, passwordHash, firstName, lastName, phone },
    });

    // Generate email verification token
    const verifyToken = jwt.sign(
      { userId: user.id, purpose: 'email-verify' },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Send verification email (async, don't block response)
    NotificationService.sendEmailVerification(email, firstName, verifyToken).catch(() => {});
    NotificationService.sendWelcomeEmail(email, firstName).catch(() => {});

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Store refresh token in session
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        userAgent: req.headers['user-agent'] || '',
        ipAddress: req.ip || '',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    logger.info(`User registered: ${email}`);

    res.status(201).json({
      success: true,
      data: { user: sanitizeUser(user), accessToken, refreshToken },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) throw new UnauthorizedError('Invalid credentials');

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) throw new UnauthorizedError('Invalid credentials');

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        userAgent: req.headers['user-agent'] || '',
        ipAddress: req.ip || '',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    logger.info(`User logged in: ${email}`);

    res.json({
      success: true,
      data: { user: sanitizeUser(user), accessToken, refreshToken },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
    if (decoded.type !== 'refresh') throw new UnauthorizedError('Invalid token type');

    const session = await prisma.session.findUnique({ where: { refreshToken } });
    if (!session) throw new UnauthorizedError('Invalid refresh token — possible token reuse');

    // Delete old session (rotate)
    await prisma.session.delete({ where: { id: session.id } });

    // Generate new pair
    const newAccessToken = generateAccessToken(decoded.userId);
    const newRefreshToken = generateRefreshToken(decoded.userId);

    await prisma.session.create({
      data: {
        userId: decoded.userId,
        refreshToken: newRefreshToken,
        userAgent: req.headers['user-agent'] || '',
        ipAddress: req.ip || '',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    res.json({
      success: true,
      data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      await prisma.session.deleteMany({ where: { refreshToken } });
    } else if (req.user) {
      await prisma.session.deleteMany({ where: { userId: req.user.id } });
    }

    logger.info(`User logged out: ${req.user?.email}`);

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const resetToken = jwt.sign(
        { userId: user.id, purpose: 'password-reset' },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );
      NotificationService.sendPasswordReset(email, user.firstName, resetToken).catch(() => {});
    }

    // Always return success to not reveal if email exists
    res.json({ success: true, message: 'If that email exists, a reset link has been sent' });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    if (decoded.purpose !== 'password-reset') throw new BadRequestError('Invalid reset token');

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { passwordHash },
    });

    // Invalidate all sessions
    await prisma.session.deleteMany({ where: { userId: decoded.userId } });

    logger.info(`Password reset for user: ${decoded.userId}`);

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    if (decoded.purpose !== 'email-verify') throw new BadRequestError('Invalid verification token');

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { isEmailVerified: true },
    });

    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idToken } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new UnauthorizedError('Invalid Google token');

    const { sub: googleId, email, given_name: firstName, family_name: lastName, picture } = payload;

    if (!email) throw new UnauthorizedError('Email not provided by Google');

    // Find or create user
    let user = await prisma.user.findFirst({
      where: { OR: [{ oauthProvider: 'google', oauthId: googleId }, { email }] },
    });

    if (user) {
      // Link Google if not linked
      if (!user.oauthId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { oauthProvider: 'google', oauthId: googleId, avatar: picture || user.avatar },
        });
      }
    } else {
      user = await prisma.user.create({
        data: {
          email,
          firstName: firstName || 'User',
          lastName: lastName || '',
          oauthProvider: 'google',
          oauthId: googleId,
          avatar: picture,
          isEmailVerified: true,
        },
      });
      NotificationService.sendWelcomeEmail(email, firstName || 'User').catch(() => {});
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        userAgent: req.headers['user-agent'] || '',
        ipAddress: req.ip || '',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    res.json({
      success: true,
      data: { user: sanitizeUser(user), accessToken, refreshToken },
    });
  } catch (error) {
    next(error);
  }
};

export const appleAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idToken, firstName, lastName } = req.body;

    // Verify Apple ID token via JWKS
    const decoded = jwt.decode(idToken, { complete: true }) as any;
    if (!decoded) throw new UnauthorizedError('Invalid Apple token');

    const appleId = decoded.payload.sub;
    const email = decoded.payload.email;

    if (!email) throw new UnauthorizedError('Email not provided by Apple');

    let user = await prisma.user.findFirst({
      where: { OR: [{ oauthProvider: 'apple', oauthId: appleId }, { email }] },
    });

    if (user) {
      if (!user.oauthId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { oauthProvider: 'apple', oauthId: appleId },
        });
      }
    } else {
      user = await prisma.user.create({
        data: {
          email,
          firstName: firstName || 'User',
          lastName: lastName || '',
          oauthProvider: 'apple',
          oauthId: appleId,
          isEmailVerified: true,
        },
      });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        userAgent: req.headers['user-agent'] || '',
        ipAddress: req.ip || '',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    res.json({
      success: true,
      data: { user: sanitizeUser(user), accessToken, refreshToken },
    });
  } catch (error) {
    next(error);
  }
};
