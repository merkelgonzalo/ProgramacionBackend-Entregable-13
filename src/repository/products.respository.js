//import { CreateUserDto, GetUserDto } from "../Dao/dto/user.dto.js"; HACER QUE EL TITULO SE ESCRIBA LA PRIMERA EN MAYUS Y LUEGO EN MINUS

export class ProductRepository{
    
    constructor(dao){
        this.dao = dao;
    }

    async addProduct(product){
        //const productDto = new CreateProductDto(product);
        const result = await this.dao.post(product);
        return result;
    }

    async getProducts(query, options){
        const result = await this.dao.get(query, options);
        return result;
    }

    async getProductById(pid){
        const result = await this.dao.getProduct(pid);
        return result;
    }

    async updateProduct(pid, product){
        const result = await this.dao.put(pid, product);
        return result;
    }
    
    async deleteProductById(pid){
        const result = await this.dao.delete(pid);
        return result;
    }

}