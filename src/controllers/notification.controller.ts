/**
 * Notification preferences controller
 */
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';

export const getNotificationPreferences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { notifyEmail: true, notifyWhatsApp: true, notifySMS: true },
    });
    res.json({ success: true, data: user });
  } catch (error) { next(error); }
};

export const updateNotificationPreferences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { notifyEmail, notifyWhatsApp, notifySMS } = req.body;
    const data: any = {};
    if (notifyEmail !== undefined) data.notifyEmail = notifyEmail;
    if (notifyWhatsApp !== undefined) data.notifyWhatsApp = notifyWhatsApp;
    if (notifySMS !== undefined) data.notifySMS = notifySMS;

    const user = await prisma.user.update({ where: { id: req.user!.id }, data });
    res.json({
      success: true,
      data: { notifyEmail: user.notifyEmail, notifyWhatsApp: user.notifyWhatsApp, notifySMS: user.notifySMS },
    });
  } catch (error) { next(error); }
};
