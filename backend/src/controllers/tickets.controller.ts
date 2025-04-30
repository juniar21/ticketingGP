import { Request, Response } from "express";
import prisma from "../prisma";

export class ticketController {
  async PostTicket(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw res.status(401).json({ message: "User Not Found" });
      }

      const { eventId, price, quota, category } = req.body;

      const event = await prisma.event.findFirst({
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

      const ticket = await prisma.ticket.create({
        data: {
          eventId,
          price,
          quota,
          category,
          updatedAt: new Date(),
        },
      });

      res.status(201).json({ message: "Ticket created", data: ticket });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async GetTicket(req: Request, res: Response) {
    try {
      const { eventId } = req.query; // atau dari req.query, req.params, tergantung kamu kirimnya gimana

      // pastikan eventId ada
      if (!eventId) {
        throw res.status(400).json({ message: "Event ID is required" });
      }

      // cari semua tiket berdasarkan eventId
      const tickets = await prisma.ticket.findMany({
        where: {
          eventId: eventId as string
        },
        orderBy: {
          createdAt: "desc", // dari yang terbaru
        },
      });

      res.status(200).json({ message: "Tickets fetched", data: tickets });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
