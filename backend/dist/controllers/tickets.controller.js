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
exports.ticketController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class ticketController {
    PostTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    throw res.status(401).json({ message: "User Not Found" });
                }
                const { eventId, price, quota, category } = req.body;
                const event = yield prisma_1.default.event.findFirst({
                    where: {
                        id: eventId,
                        userId: userId, // event harus dimiliki oleh user ini
                    },
                });
                if (!event) {
                    throw res
                        .status(404)
                        .json({ message: "Event not found or unauthorized" });
                }
                const ticket = yield prisma_1.default.ticket.create({
                    data: {
                        eventId,
                        price,
                        quota,
                        category,
                        updatedAt: new Date(),
                    },
                });
                res.status(201).json({ message: "Ticket created", data: ticket });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    GetTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId } = req.body; // atau dari req.query, req.params, tergantung kamu kirimnya gimana
                // pastikan eventId ada
                if (!eventId) {
                    throw res.status(400).json({ message: "Event ID is required" });
                }
                // cari semua tiket berdasarkan eventId
                const tickets = yield prisma_1.default.ticket.findMany({
                    where: {
                        eventId: eventId,
                    },
                    orderBy: {
                        createdAt: "desc", // dari yang terbaru
                    },
                });
                res.status(200).json({ message: "Tickets fetched", data: tickets });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    GetTicketById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId } = req.params;
                if (!eventId) {
                    throw res.status(400).json({ message: "Event ID is required" });
                }
                const tickets = yield prisma_1.default.ticket.findMany({
                    where: {
                        eventId,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                });
                res.status(200).json({ message: "Tickets fetched", data: tickets });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ message: "Failed to fetch tickets" });
            }
        });
    }
}
exports.ticketController = ticketController;
