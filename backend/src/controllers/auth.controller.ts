import { Request, Response } from "express";
import { compare, genSalt, hash } from "bcrypt";
import prisma from "../prisma";
import { sign } from "jsonwebtoken";
import { generateReferralCode } from "../helpers/generatecode";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { fullname, username, email, password } = req.body;

      // Generate unique referral code

      const salt = await genSalt(10);
      const hashedPass = await hash(password, salt);

      const user = await prisma.user.create({
        data: { fullname, username, email, password: hashedPass },
      });

      const payload = { id: user.id, Role: user.role };
      const token = sign(payload, process.env.KEY_JWT!, {
        expiresIn: "1h",
      });

      const link = `${process.env.URL_FE}/verify/${token}`;

      res.status(201).send({
        message: "User created 👌",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) throw { message: "User not found" };

      const isValidPass = await compare(password, user.password);
      if (!isValidPass) throw { message: "Incorrect Password" };

      const payload = { id: user.id, Role: user.role };
      const token = sign(payload, process.env.KEY_JWT!, {
        expiresIn: "1h",
      });

      res.status(200).send({
        message: "Login Succsesfully!",
        data: user,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user?.id },
        include: { points: true }
      });
  
      if (!user) throw { message: "User not found" };
  
      let referral = "";
  
      while (true) {
        referral = generateReferralCode(user.fullname ?? "user");
        const found = await prisma.user.findUnique({ where: { referral } });
        if (!found) break;
      }
  
      // Update user: isVerify true + buat referral-nya
      await prisma.user.update({
        where: { id: user.id },
        data: {
          isVerify: true,
          referral: referral
        }
      });
  
      // Proses reward berdasarkan referral code yang dipakai saat register
      const referer = await prisma.user.findUnique({
        where: { referral: req.body.referralCodeUsed } // atau bisa kamu simpan di user table
      });
  
      if (referer) {
        await prisma.poin.create({
          data: {
            amount: 10000,
            expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            userId: user.id
          }
        });
  
        await prisma.voucher.create({
          data: {
            expiredAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            userId: referer.id
          }
        });
      }

      res.status(200).send({
        message: "Verified Successfully!",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
