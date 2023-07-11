import { ticketService } from "../repository/index.js";
import mongoose from 'mongoose';

export const getTicketsController = async (req, res) => {
    try {
        let result = await ticketService.getTickets();
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log('Cannot get tickets with mongoose: ' + error)
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const createTicketController = async (req, res) => {
    try {
        const amount = req.body.amount;
        const purchaser = req.body.purchaser;
        let result = await ticketService.addTicket(amount, purchaser);
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log('Cannot create ticket with mongoose: ' + error)
        res.status(500).json({ status: "error", message: error.message });
    }
}