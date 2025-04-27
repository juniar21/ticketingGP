import { Request, Response } from "express";
import prisma from "../prisma";

export class ticketController {
    async PostTicket (req: Request, res: Response) {
        try {
           const userId =  req.user?.id
           
           if (!userId) {
            throw res.status(401).json({ message: "Unauthorized" });
          }
              
          const { eventId, price, quota, category } = req.body;
 
          const event = await prisma.event.findFirst({
            where: {
              id: eventId,
              userId: userId, // event harus dimiliki oleh user ini
            },
          });

          if (!event) {
            throw res.status(404).json({ message: "Event not found or unauthorized" });
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
          const userId = req.user?.id;
      
          if (!userId) {
            throw res.status(401).json({ message: "Unauthorized" });
          }
      
          // cari event pertama yang dimiliki user
          const event = await prisma.event.findFirst({
            where: {
              userId: userId,
            },
            orderBy: {
              createdAt: 'asc', // atau 'desc' kalau mau ambil event terbaru
            },
          });
      
          if (!event) {
            throw res.status(404).json({ message: "No event found for this user" });
          }
      
          // ambil tiket-tiket dari event tersebut
          const tickets = await prisma.ticket.findMany({
            where: {
              eventId: event.id,
            },
            orderBy: {
              createdAt: 'desc',
            },
          });
      
          res.status(200).json({ message: "Tickets fetched", data: tickets });
        } catch (err) {
          console.log(err);
          res.status(400).send(err);
        }
      }


}