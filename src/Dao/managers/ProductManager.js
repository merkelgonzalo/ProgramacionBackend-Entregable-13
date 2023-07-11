import { productModel } from '../models/products.model.js';
import ManagerAccess from '../managers/ManagerAccess.js';

const managerAccess = new ManagerAccess();

export default class ProductManager{

    constructor(){
        this.model = productModel;
    }

    post = async (productBody) => {
        try{
            await managerAccess.saveLog('POST a product');
            let {title, description, price, thumnail, code, stock, category} = productBody;
            let result = await this.model.create({
                title,
                description,
                price,
                thumnail,
                code,
                stock,
                category,
                status: true
            });
            
            return result;

        }catch(error){
            console.log('Cannot post the product in manager with mongoose: '+error)
        }
    }

    get = async(query, options) => {   
        try{
            await managerAccess.saveLog('GET producs');
            const result = await this.model.paginate(query, options);
            return result;
        }catch(error){
            console.log('Cannot get products in manager with mongoose: '+error)
        }
    }

    getProduct = async(pid) => {
        try{
            await managerAccess.saveLog('GET a product');
            const result = await this.model.findOne({_id:pid});
            return result;
        }catch(error){
            console.log('Cannot get product by id in manager with mongoose: '+error)
        }
    }

    put = async (idProduct, product) => {
        try{
            await managerAccess.saveLog('UPDATE a product');
            let result = await this.model.updateOne({_id:idProduct}, {$set:product});
            return result;
        }catch(error){
            console.log('Cannot update product by id in manager with mongoose: '+error)
        }
        
    }

    delete = async (aId) => {
        try{
            await managerAccess.saveLog('DELETE a product');
            let result = await this.model.findByIdAndDelete(aId);
            return result;
        }catch(error){
            console.log('Cannot delete the product in manager with mongoose: '+error);
        }
    }

}
