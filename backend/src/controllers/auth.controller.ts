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
      let referral = "";
      while (true) {
        referral = generateReferralCode(fullname);
        const found = await prisma.user.findUnique({ where: { referral } });
        if (!found) break;
      }

      const salt = await genSalt(10);
      const hashedPass = await hash(password, salt);

      const user = await prisma.user.create({
        data: { fullname, username, email, password: hashedPass, referral },
      });
      // const payload = { id: user.id, Role: user.role };
      // const token = sign(payload, process.env.KEY_JWT!, {
      //   expiresIn: "10m",
      // });

      // const link = `${process.env.URL_FE}/verify/${token}`;

      res.status(201).send({ message: "User created 👌" });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
