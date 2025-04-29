import { Request, Response } from "express";
import prisma from "../prisma";
import { cloudinaryUpload } from "../helpers/cloudinary";

export class EventsController {
  async PostEvents(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId)
        throw res.status(404).json({ message: "User NOT Found" });

      const {
        title,
        category,
        location,
        circuit,
        startTime,
        endTime,
        date,
        //image,
      } = req.body;

      const event = await prisma.event.create({
        data: {
          title,
          category,
          location,
          circuit,
          startTime,
          endTime,
          date,
          //image,
          userId: req.user?.id!,
        },
      });

      res.status(200).send({
        message: "Events Created",
        event,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async GetEvent(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId)
        throw res.status(404).json({ message: "User NOT Found" });

      const data = await prisma.event.findMany({
        where: {
          userId: req.user?.id,
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
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async GetEventAll(req: Request, res: Response){
    try {
      const events = await prisma.event.findMany()
      res.status(200).send({
        message: `Get All Events`,
        events,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err)
    }
  }

  async createPostCloud(req: Request, res: Response) {
    try {
      if (!req.file) throw { message: "image empty" };
      const { title,
        category,
        location,
        circuit,
        startTime,
        endTime,
        date, } = req.body;
      const { secure_url } = await cloudinaryUpload(req.file, "ig");

      await prisma.event.create({
        data: { image: secure_url, 
          title,
          category,
          location,
          circuit,
          startTime,
          endTime,
          date,
          userId: req.user?.id!, },
      });

      res.status(201).send({
        message: "Post created",
        secure_url,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
  async GetEventTicket(req: Request, res: Response){
    try {
      const {eventId} = req.body
      const data = await prisma.event.findFirst({
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
    } catch (err) {
      console.log(err);
      res.status(400).send(err)
    }
  }

  async getDashboardMetrics (req: Request, res: Response){
    try {
      const userId = req.user?.id;
      if (!userId)
        throw res.status(404).json({ message: "User NOT Found" }); // asumsi ambil dari URL param
  
      // 1. Total Events dibuat oleh organizer ini
      const totalEvents = await prisma.event.count({
        where: { userId: userId },
      });
  
      // 2. Ambil semua eventId yang dimiliki organizer ini
      const organizerEvents = await prisma.event.findMany({
        where: { userId: userId },
        select: { id: true },
      });
      const eventIds = organizerEvents.map(event => event.id);
  
      // 3. Ambil semua ticketId yang terkait eventIds tersebut
      const tickets = await prisma.ticket.findMany({
        where: { eventId: { in: eventIds } },
        select: { id: true },
      });
      const ticketIds = tickets.map(ticket => ticket.id);
  
      // 4. Total Orders berdasarkan ticket-tickernya
      const totalOrders = await prisma.order.count({
        where: { ticketId: { in: ticketIds } },
      });
  
      // 5. Total Profit (jumlah amount semua order)
      const totalProfitResult = await prisma.order.aggregate({
        where: { ticketId: { in: ticketIds } },
        _sum: {
          amount: true,
        },
      });
      const totalProfit = totalProfitResult._sum.amount || 0;
  
      // 6. Total Tickets yang dibuat di event-event ini
      const totalTickets = await prisma.ticket.count({
        where: { eventId: { in: eventIds } },
      });
  
      throw res.status(200).send({
        message: "Data Getting",
        totalEvents,
        totalOrders,
        totalProfit,
        totalTickets,
      });
    } catch (err) {
      console.error(err);
      res.status(400).send(err)
    }
  }

}
