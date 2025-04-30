"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = require("bcrypt");
const prisma_1 = __importDefault(require("../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
const generatecode_1 = require("../helpers/generatecode");
const mailer_1 = require("../helpers/mailer");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fullname, username, email, password, referredBy } = req.body;
                // Generate unique referral code
                const salt = yield (0, bcrypt_1.genSalt)(10);
                const hashedPass = yield (0, bcrypt_1.hash)(password, salt);
                let referral = "";
                while (true) {
                    referral = (0, generatecode_1.generateReferralCode)(fullname);
                    const found = yield prisma_1.default.user.findUnique({ where: { referral } });
                    if (!found)
                        break;
                }
                console.log("Referred By:", referredBy);
                let referrer = null;
                if (referredBy) {
                    referrer = yield prisma_1.default.user.findUnique({
                        where: { referral: referredBy },
                    });
                    console.log("Referrer:", referrer);
                    if (!referrer)
                        throw { message: "Invalid referral code" };
                }
                const user = yield prisma_1.default.user.create({
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
                const token = (0, jsonwebtoken_1.sign)(payload, process.env.KEY_JWT, {
                    expiresIn: "1h",
                });
                const link = `${process.env.URL_FE}/verify/${token}`;
                const templatePath = path_1.default.join(__dirname, "../templates", `verify.hbs`);
                const templateSource = fs_1.default.readFileSync(templatePath, "utf-8");
                const compiledTemplate = handlebars_1.default.compile(templateSource);
                const html = compiledTemplate({ username, link });
                yield mailer_1.transporter.sendMail({
                    from: process.env.GMAIL_USER,
                    to: email,
                    subject: "Email Verification",
                    html,
                });
                res.status(201).send({
                    message: "User created 👌",
                });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield prisma_1.default.user.findUnique({ where: { username } });
                if (!user)
                    throw { message: "User not found" };
                if (!user.isVerify)
                    throw { message: "User is not verify" };
                const isValidPass = yield (0, bcrypt_1.compare)(password, user.password);
                if (!isValidPass)
                    throw { message: "Incorrect Password" };
                const payload = { id: user.id, Role: user.role };
                const access_token = (0, jsonwebtoken_1.sign)(payload, process.env.KEY_JWT, {
                    expiresIn: "1h",
                });
                res.status(200).send({
                    message: "Login Succsesfully!",
                    data: user,
                    access_token,
                });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = yield prisma_1.default.user.findUnique({
                    where: { id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id },
                });
                if (!user)
                    throw { message: "User not found" };
                // Update user: isVerify true
                // Proses reward berdasarkan referral code yang dipakai saat register
                if (user.referredBy) {
                    const referer = yield prisma_1.default.user.findUnique({
                        where: { referral: user.referredBy }, // atau bisa kamu simpan di user table
                    });
                    if (referer) {
                        yield prisma_1.default.poin.create({
                            data: {
                                amount: 10000,
                                expiredAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                                userId: referer.id,
                            },
                        });
                    }
                    yield prisma_1.default.voucher.create({
                        data: {
                            percentage: 10,
                            description: "Voucher referral bonus",
                            expiredAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                            userId: user.id,
                        },
                    });
                }
                yield prisma_1.default.user.update({
                    where: { id: user.id },
                    data: {
                        isVerify: true,
                    },
                });
                res.status(200).send({
                    message: "Verified Successfully!",
                });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
}
exports.AuthController = AuthController;
