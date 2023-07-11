export class TicketRepository{
    
    constructor(dao){
        this.dao = dao;
    }

    async add(amount, purchaser){
        const result = await this.dao.post(amount, purchaser);
        return result;
    }

    async get(){
        const result = await this.dao.get();
        return result;
    }

    async updateCode(cart){
        const result = await this.dao.put(cart._id);
        return result;
    }
}