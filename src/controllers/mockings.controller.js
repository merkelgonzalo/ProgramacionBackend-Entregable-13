import { productService } from "../repository/index.js";
import {Faker, en, es } from "@faker-js/faker";

export const createProductsController = async (req, res) => {
    try {
        const customFaker = new Faker({locale: [en]});
        const { commerce, image, database, string, internet, person, phone, datatype, lorem } = customFaker;
        
        const productsNumber = Math.ceil(Math.random()*100);
        for (let i = 0; i < productsNumber; i++) {
            let product = {
                title: commerce.productName(),
                description: commerce.productDescription(),
                price: parseFloat(commerce.price()),
                thumbnail: image.url(),
                code: string.alphanumeric(10),
                stock: parseInt(string.numeric(2)),
                category: commerce.department(),
                status: datatype.boolean()
            };
            await productService.addProduct(product);
        }
        const result = await productService.getProducts();
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        console.log('Cannot post the mockings products with mongoose: '+error);
        res.status(400).json({ status: "error", message: error.message });
    }
}