import { Request, Response } from "express";
import prisma from "../prisma";

export class EventsController {
    async PostEvents(req:Request, res: Response) {
        const { title, location, circuit, starttime, endtime, date, image } = req.body;

        
        
    }
}