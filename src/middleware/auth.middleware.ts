import type { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError, type JwtPayload } from "jsonwebtoken";
import { UserRole } from "@prisma/client";

import { prisma } from "@/config/database";
import { ForbiddenError, UnauthorizedError } from "@/utils/errors";

function getTokenFromHeader(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.slice("Bearer ".length);
}

export async function authenticate(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedError("Access token required");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET ?? "") as JwtPayload;
    if (payload.type !== "access" || typeof payload.userId !== "string") {
      throw new UnauthorizedError("Invalid token");
    }

    if (!prisma) {
      throw new UnauthorizedError("Database connection unavailable");
    }
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    };
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      next(new UnauthorizedError("Token expired"));
      return;
    }
    if (error instanceof JsonWebTokenError) {
      next(new UnauthorizedError("Invalid token"));
      return;
    }
    next(error);
  }
}

export function requireRole(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new UnauthorizedError("Access token required"));
      return;
    }
    if (!roles.includes(req.user.role)) {
      next(new ForbiddenError("Insufficient permissions"));
      return;
    }
    next();
  };
}

export const authMiddleware = authenticate;
