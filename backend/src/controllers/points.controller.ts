import { Request, Response } from "express";
import prisma from "../prisma";

export class PointsController {
  async getPointsVoucher(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId)
        throw res.status(404).json({ message: "User NOT aUTHORIZED" });

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          points: true,
          vouchered: true,
        },
      });
      if (!user) throw res.status(404).json({ message: "User not found" });

      const now = new Date();

      const validPoints = user.points.filter(
        (p: { expiredAt: Date }) => p.expiredAt > now
      );
      const validVouchers = user.vouchered.filter(
        (v: { expiredAt: Date }) => v.expiredAt > now
      );

      res.status(200).json({
        message: "This Voucher and Point",
        user,
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Failed to fetch rewards" });
    }
  }
}
