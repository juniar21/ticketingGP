import { Request, Response } from "express";
import prisma from "../prisma";
import { cloudinaryUpload } from "../helpers/cloudinary";

export class EventsController {
  async PostEvents(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId)
        throw res.status(404).json({ message: "User NOT aUTHORIZED" });

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
        throw res.status(404).json({ message: "User NOT aUTHORIZED" });

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

}
