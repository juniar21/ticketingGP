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
exports.Order = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const xendit_1 = __importDefault(require("../helpers/xendit"));
const prisma_2 = require("../generated/prisma");
class Order {
    CreateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const { ticketId, quantity, amount } = req.body;
                    const order = yield tx.order.create({
                        data: {
                            ticketId,
                            quantity,
                            amount,
                            status: "PENDING",
                            expiredAt: new Date(Date.now() + 60 * 60 * 1000),
                            updatedAt: new Date(),
                            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                        },
                    });
                    yield tx.ticket.update({
                        data: { quota: { decrement: quantity } },
                        where: { id: ticketId },
                    });
                    const data = {
                        amount,
                        invoiceDuration: "172800",
                        externalId: order.id,
                        description: `Invoice order with id ${order.id}`,
                        currency: "IDR",
                        reminderTime: 1,
                    };
                    const invoice = yield xendit_1.default.Invoice.createInvoice({ data });
                    yield tx.order.update({
                        data: { invoiceUrl: invoice.invoiceUrl },
                        where: { id: order.id },
                    });
                    res.status(201).send({ message: "Order Created!", invoice });
                }));
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, external_id } = req.body;
                if (status == prisma_2.OrderStatus.PAID) {
                    yield prisma_1.default.order.update({
                        data: { status: "PAID" },
                        where: { id: external_id },
                    });
                }
                else if (status == prisma_2.OrderStatus.EXPIRED) {
                    yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                        yield tx.order.update({
                            data: { status: "CANCELLED" },
                            where: { id: external_id },
                        });
                        const order = yield tx.order.findUnique({
                            where: { id: external_id },
                        });
                        yield tx.ticket.update({
                            data: { quota: { increment: order === null || order === void 0 ? void 0 : order.quantity } },
                            where: { id: order === null || order === void 0 ? void 0 : order.ticketId },
                        });
                    }));
                }
                res.status(200).send({ message: "success" });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    GetOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    throw res.status(404).json({ message: "User NOT FOUND" });
                const orders = yield prisma_1.default.order.findMany({
                    where: {
                        ticket: {
                            event: {
                                userId: userId, // Ini kunci utamanya
                            },
                        },
                    },
                    include: {
                        ticket: {
                            include: {
                                event: true, // kalau mau sekalian ambil data event
                            },
                        },
                        user: true, // kalau mau ambil data user yang beli
                    },
                });
                res.status(200).json({
                    message: "Orders fetched successfully",
                    data: orders,
                });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    GetOrderTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    throw res.status(404).json({ message: "User NOT FOUND" });
                const orders = yield prisma_1.default.order.findMany({
                    where: { userId },
                    orderBy: { createdAt: "desc" },
                    include: {
                        ticket: true,
                    },
                });
                res.status(200).json({ message: "User's orders fetched", data: orders });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
}
exports.Order = Order;
