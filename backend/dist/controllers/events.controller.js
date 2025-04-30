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
exports.EventsController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const cloudinary_1 = require("../helpers/cloudinary");
class EventsController {
    PostEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    throw res.status(404).json({ message: "User NOT Found" });
                const { title, category, location, circuit, startTime, endTime, date, } = req.body;
                const image = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
                const event = yield prisma_1.default.event.create({
                    data: {
                        title,
                        category,
                        location,
                        circuit,
                        startTime,
                        endTime,
                        date,
                        image,
                        userId: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id,
                    },
                });
                res.status(200).send({
                    message: "Events Created",
                    event,
                });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    GetEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    throw res.status(404).json({ message: "User NOT Found" });
                const data = yield prisma_1.default.event.findMany({
                    where: {
                        userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
                    },
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true
                            },
                        },
                    },
                });
                res.status(200).send({
                    message: `Get Events ${userId}`,
                    data,
                });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    GetEventAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield prisma_1.default.event.findMany();
                res.status(200).send({
                    message: `Get All Events`,
                    events,
                });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    createPostCloud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!req.file)
                    throw { message: "image empty" };
                const { title, category, location, circuit, startTime, endTime, date, } = req.body;
                const { secure_url } = yield (0, cloudinary_1.cloudinaryUpload)(req.file, "ig");
                const start = new Date(`${date}T${startTime}`);
                const end = new Date(`${date}T${endTime}`);
                yield prisma_1.default.event.create({
                    data: { image: secure_url,
                        title,
                        category,
                        location,
                        circuit,
                        startTime: start,
                        endTime: end,
                        date: new Date(date),
                        userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, },
                });
                res.status(201).send({
                    message: "Post created",
                    secure_url,
                });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    GetEventTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId } = req.body;
                const data = yield prisma_1.default.event.findFirst({
                    where: {
                        id: eventId, // atau kriteria lain
                    },
                    include: {
                        tickets: true, // ambil juga semua tiket yang terkait event ini
                    },
                });
                res.status(201).send({
                    message: "Data Getting",
                    data,
                });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    getDashboardMetrics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    throw res.status(404).json({ message: "User NOT Found" }); // asumsi ambil dari URL param
                // 1. Total Events dibuat oleh organizer ini
                const totalEvents = yield prisma_1.default.event.count({
                    where: { userId: userId },
                });
                // 2. Ambil semua eventId yang dimiliki organizer ini
                const organizerEvents = yield prisma_1.default.event.findMany({
                    where: { userId: userId },
                    select: { id: true },
                });
                const eventIds = organizerEvents.map(event => event.id);
                // 3. Ambil semua ticketId yang terkait eventIds tersebut
                const tickets = yield prisma_1.default.ticket.findMany({
                    where: { eventId: { in: eventIds } },
                    select: { id: true },
                });
                const ticketIds = tickets.map(ticket => ticket.id);
                // 4. Total Orders berdasarkan ticket-tickernya
                const totalOrders = yield prisma_1.default.order.count({
                    where: { ticketId: { in: ticketIds } },
                });
                // 5. Total Profit (jumlah amount semua order)
                const totalProfitResult = yield prisma_1.default.order.aggregate({
                    where: { ticketId: { in: ticketIds } },
                    _sum: {
                        amount: true,
                    },
                });
                const totalProfit = totalProfitResult._sum.amount || 0;
                // 6. Total Tickets yang dibuat di event-event ini
                const totalTickets = yield prisma_1.default.ticket.count({
                    where: { eventId: { in: eventIds } },
                });
                throw res.status(200).send({
                    message: "Data Getting",
                    totalEvents,
                    totalOrders,
                    totalProfit,
                    totalTickets,
                });
            }
            catch (err) {
                console.error(err);
                res.status(400).send(err);
            }
        });
    }
    getEventById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const event = yield prisma_1.default.event.findUnique({
                    where: { id },
                });
                if (!event) {
                    throw res.status(404).json({ message: "Event not found" });
                }
                res.status(200).json(event);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.EventsController = EventsController;
