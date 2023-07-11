import { userModel } from '../models/users.model.js';
import ManagerAccess from '../managers/ManagerAccess.js';

const managerAccess = new ManagerAccess();

export default class UserManager{

    constructor(){
        this.model = userModel;
    }

    async get(){
        try {
            const result = await this.model.find();;
            return result;
        } catch (error) {
            console.log('Cannot get users in manager with mongoose: '+error)
        }
    }
    async post(user){
        try {
            const result = await this.model.create(user);
            return result;
        } catch (error) {
            console.log('Cannot post the user in manager with mongoose: '+error)     
        }
    }
    async getByCart(cid){
        try {
            const result = await this.model.findOne({cart: cid})
            return result;
        } catch (error) {
            console.log('Cannot get user by cart ID in manager with mongoose: '+error)
        }
    }
}
