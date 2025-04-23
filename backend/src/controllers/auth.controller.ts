import { Request, Response } from "express";
import { compare, genSalt, hash } from "bcrypt";
import prisma from "../prisma";
import { sign } from "jsonwebtoken";
import { generateReferralCode } from "../helpers/generatecode";
import { transporter } from "../helpers/mailer";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { fullname, username, email, password, referredBy } = req.body;

      // Generate unique referral code

      const salt = await genSalt(10);
      const hashedPass = await hash(password, salt);

      let referral = "";

      while (true) {
        referral = generateReferralCode(fullname);
        const found = await prisma.user.findUnique({ where: { referral } });
        if (!found) break;
      }

      console.log("Referred By:", referredBy);4

      let referrer = null;
      if (referredBy) {
        referrer = await prisma.user.findUnique({
          where: { referral: referredBy },
        });
        console.log("Referrer:", referrer);
        if (!referrer) throw { message: "Invalid referral code" };
      }

      const user = await prisma.user.create({
        data: {
          fullname,
          username,
          email,
          password: hashedPass,
          referral,
          referredBy: referrer ? referrer.referral : null, // Use referrer.referral, not referredBy directly
        },
      });

      const payload = { id: user.id, Role: user.role };
      const token = sign(payload, process.env.KEY_JWT!, {
        expiresIn: "1h",
      });

      const link = `${process.env.URL_FE}/verify/${token}`;

      const templatePath = path.join(__dirname, "../templates", `verify.hbs`);
      const templateSource = fs.readFileSync(templatePath, "utf-8");
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({ username, link });

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Email Verification",
        html,
      });

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
      if (!user.isVerify) throw { message: "User is not verify" };

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
      });

      if (!user) throw { message: "User not found" };

      // Update user: isVerify true

      // Proses reward berdasarkan referral code yang dipakai saat register
      if (user.referredBy) {
        const referer = await prisma.user.findUnique({
          where: { referral: user.referredBy }, // atau bisa kamu simpan di user table
        });

        if (referer) {
          await prisma.poin.create({
            data: {
              amount: 10000,
              expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              userId: referer.id,
            },
          });
        }

        await prisma.voucher.create({
          data: {
            percentage: 10,
            description: "Voucher referral bonus",
            expiredAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            userId: user.id,
          },
        });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          isVerify: true,
        },
      });
      res.status(200).send({
        message: "Verified Successfully!",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
