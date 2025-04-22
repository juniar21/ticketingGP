import { Request, Response } from "express";
import { compare, genSalt, hash } from "bcrypt";
import prisma from "../prisma";
import { sign } from "jsonwebtoken";
import { generateReferralCode } from "../helpers/generatecode";
import { transporter } from "../helpers/mailer";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";

export class AuthControllerO {
  async register(req: Request, res: Response) {
    try {
      const { fullname, username, email, password } = req.body;

      // Generate unique referral code

      const salt = await genSalt(10);
      const hashedPass = await hash(password, salt);

      let referral = "";
  
      while (true) {
        referral = generateReferralCode(fullname);
        const found = await prisma.user.findUnique({ where: { referral } });
        if (!found) break;
      }

      const user = await prisma.user.create({
        data: { fullname, username, email, password: hashedPass, referral, role: "PROMOTOR"},
      });

      const payload = { id: user.id, Role: user.role };
      const token = sign(payload, process.env.KEY_JWT!, {
        expiresIn: "1h",
      });

      const link = `${process.env.URL_FE}/organizer/verify/${token}`;

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
      
      await prisma.user.update({
        where: { id: user.id },
        data: {
          isVerify: true,
        }
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