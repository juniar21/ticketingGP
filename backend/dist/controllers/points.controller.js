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
exports.PointsController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class PointsController {
    getPointsVoucher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    throw res.status(404).json({ message: "User not found" });
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        id: userId,
                    },
                    include: {
                        points: true,
                        vouchered: true,
                    },
                });
                if (!user)
                    throw res.status(404).json({ message: "User not found" });
                const now = new Date();
                const validPoints = user.points.filter((p) => p.expiredAt > now);
                const validVouchers = user.vouchered.filter((v) => v.expiredAt > now);
                const totalValidPoints = validPoints.reduce((sum, p) => sum + p.amount, 0);
                const totalValidVouchers = validVouchers.reduce((sum, v) => sum + v.percentage, 0);
                res.status(200).json({
                    message: "This Voucher and Point",
                    totalValidPoints,
                    totalValidVouchers,
                });
            }
            catch (err) {
                console.error(err);
                res.status(400).json({ message: "Failed to fetch rewards" });
            }
        });
    }
    getPoints(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    throw res.status(404).json({ message: "User not found" });
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        id: userId,
                    },
                    include: {
                        points: true,
                    },
                });
                if (!user)
                    throw res.status(404).json({ message: "User not found" });
                const now = new Date();
                const validPoints = user.points.filter((p) => p.expiredAt > now);
                const totalValidPoints = validPoints.reduce((sum, p) => sum + p.amount, 0);
                res.status(200).json({
                    message: "This Point",
                    totalValidPoints,
                });
            }
            catch (err) {
                console.error(err);
                res.status(400).json({ message: "Failed to fetch rewards" });
            }
        });
    }
    getVoucher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    throw res.status(404).json({ message: "User not found" });
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        id: userId,
                    },
                    include: {
                        vouchered: true,
                    },
                });
                if (!user)
                    throw res.status(404).json({ message: "User not found" });
                const now = new Date();
                const validVouchers = user.vouchered.filter((v) => v.expiredAt > now);
                const totalValidVouchers = validVouchers.reduce((sum, v) => sum + v.percentage, 0);
                res.status(200).json({
                    message: "This Voucher",
                    totalValidVouchers,
                });
            }
            catch (err) {
                console.error(err);
                res.status(400).json({ message: "Failed to fetch rewards" });
            }
        });
    }
}
exports.PointsController = PointsController;
