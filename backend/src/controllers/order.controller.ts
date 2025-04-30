import { Request, Response } from "express";
import prisma from "../prisma";
import xendit from "../helpers/xendit";
import { CreateInvoiceRequest } from "xendit-node/invoice/models";
import { OrderStatus } from "../generated/prisma";

export class Order {
  async CreateOrder(req: Request, res: Response) {
    try {
      const orders = req.body;

      await prisma.$transaction(async (tx) => {
        for (const orderData of orders) {
          const { ticketId, quantity, amount } = orderData;
          const order = await tx.order.create({
            data: {
              ticketId,
              quantity,
              amount,
              status: "PENDING",
              expiredAt: new Date(Date.now() + 60 * 60 * 1000),
              updatedAt: new Date(),
              userId: req.user?.id!,
            },
          });
          await tx.ticket.update({
            data: { quota: { decrement: quantity } },
            where: { id: ticketId },
          });
          const data: CreateInvoiceRequest = {
            amount,
            invoiceDuration: "172800",
            externalId: order.id,
            description: `Invoice order with id ${order.id}`,
            currency: "IDR",
            reminderTime: 1,
          };
          const invoice = await xendit.Invoice.createInvoice({ data });

          await tx.order.update({
            data: { invoiceUrl: invoice.invoiceUrl },
            where: { id: order.id },
          });

          res.status(201).send({ message: "Order Created!", invoice });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
  async updateStatus(req: Request, res: Response) {
    try {
      const { status, external_id } = req.body;
      if (status == OrderStatus.PAID) {
        await prisma.order.update({
          data: { status: "PAID" },
          where: { id: external_id },
        });
      } else if (status == OrderStatus.EXPIRED) {
        await prisma.$transaction(async (tx) => {
          await tx.order.update({
            data: { status: "CANCELLED" },
            where: { id: external_id },
          });

          const order = await tx.order.findUnique({
            where: { id: external_id },
          });

          await tx.ticket.update({
            data: { quota: { increment: order?.quantity } },
            where: { id: order?.ticketId },
          });
        });
      }
      res.status(200).send({ message: "success" });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async GetOrder(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId)
        throw res.status(404).json({ message: "User NOT FOUND" });

      const orders = await prisma.order.findMany({
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
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async GetOrderTicket(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId)
        throw res.status(404).json({ message: "User NOT FOUND" });

      const orders = await prisma.order.findMany({
        where: { userId, },
        orderBy: { createdAt: "desc" },
        include: {
          ticket: true,
        },
      });

      res.status(200).json({ message: "User's orders fetched", data: orders });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
