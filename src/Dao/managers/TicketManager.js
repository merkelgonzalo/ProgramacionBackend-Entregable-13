import { ticketModel } from '../models/tickets.model.js';
import ManagerAccess from '../managers/ManagerAccess.js';
import { v4 as uuidv4 } from 'uuid';

const managerAccess = new ManagerAccess();

export default class TicketManager{

    constructor(){
        this.model = ticketModel;
    }

    post = async (amount, purchaser) => {
        try{
            await managerAccess.saveLog('POST a ticket');
            let result = await this.model.create({
                amount,
                purchaser
            });
            return result;
        }catch(error){
            console.log('Cannot post the ticket in manager with mongoose: '+error)
        }
    }

    get = async() => {   
        try{
            await managerAccess.saveLog('GET tickets');
            const result = await this.model.find();
            return result;
        }catch(error){
            console.log('Cannot get tickets in manager with mongoose: '+error)
        }
    }

    put = async (cartId) => {
        try{
            await managerAccess.saveLog('PUT a ticket');
            let newCode = uuidv4();
            let result = await this.model.updateOne({_id:cartId}, {$set: {code: newCode}});
            return result;
        }catch(error){
            console.log('Cannot post the ticket in manager with mongoose: '+error)
        }
    }

}