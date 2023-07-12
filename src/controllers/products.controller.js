import { errorService, productService } from "../repository/index.js";
import { EError } from "../enums/EError.js";

export const getProductsController = async (req, res) => {
    try {

        const limit = parseInt(req.query.limit) || 10;
        const sort = parseInt(req.query.sort) || 0;
        const page = parseInt(req.query.page) || 1;
        const queryParam = req.query.query || null;

        let query = {};

        if (queryParam !== null) {
            query["$or"] = [
                { category: { $regex: queryParam, $options: "i" } },
                {
                    status: ["true", "false"].includes(queryParam.toLowerCase())
                        ? JSON.parse(queryParam.toLowerCase())
                        : undefined,
                },
            ];
        }

        const options = {
            limit,
            page,
            lean: true
        };

        if (sort !== 0) {
            options.sort = { price: sort };
        }

        const result = await productService.getProducts(query, options);
        const products = result.docs;
        
        res.send({
            status: "success",
            payload: products
        });
    } catch (error) {
        console.log('Cannot get products with mongoose: '+error);
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const getProductController = async (req, res) => {
    try {
        const productId = req.params.pid;
        const result = await productService.getProductById(productId);
        if(result === undefined){ //res.status(400).json({status:"error", error: "ID NOT FOUND"});
            errorService.customError({
                name: "Product ID error",
                cause: errorService.generateProductErrorParam(productId),
                message:"Error when try to find the product by id",
                errorCode: EError.INVALID_PARAM
            }) 
        }      
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        console.log('Cannot get the product with mongoose: '+error);
        res.status(400).json({ message: error });
    }
}

export const createProductController = async (req, res) => {
    try {
        let productBody = req.body;
        if(!productBody.title || !productBody.price || !productBody.code || !productBody.category){
            errorService.customError({
                name: "Product create error",
                cause: errorService.generateProductErrorInfo(req.body),
                message: "Error when try to create a product",
                errorCode: EError.INVALID_JSON
            });
        }else{
            let result = await productService.addProduct(productBody);
            res.send({
                status: 'success',
                payload: result
            });
        }
    } catch (error) {
        console.log('Cannot post the product with mongoose: '+error);
        res.status(400).json({ status: "error", message: error.message });
    }
}

export const updateProductController = async (req, res) => {
    try {
        const product = req.body;
        const idProduct = req.params.pid;
        
        if(!product.title || !product.price || !product.code || !product.category){
            errorService.customError({
                name: "Product update error",
                cause: errorService.generateProductErrorInfo(product),
                message: "Error when try to update a product",
                errorCode: EError.INVALID_JSON
            });
        }else{
            let result = await productService.updateProduct(idProduct, product);
            if(result.matchedCount === 0) {
                errorService.customError({
                    name: "Product update error",
                    cause: errorService.generateProductErrorParam(idProduct),
                    message:"Error when try to find the product by id",
                    errorCode: EError.INVALID_PARAM
                }) 
            }
            res.send({status: 'success', payload: result})
        }
    } catch (error) {
        console.log('Cannot update the product with mongoose: '+error);
        res.status(400).json({ status: "error", message: error.message });
    }
}

export const deleteProductController = async (req, res) => {
    try {
        const idProduct = req.params.pid;
        let result = await productService.deleteProductById(idProduct);
        if(result === null) {
            errorService.customError({
                name: "Product delete error",
                cause: errorService.generateProductErrorParam(idProduct),
                message:"Error when try to delete the product by id",
                errorCode: EError.INVALID_PARAM
            }) 
        }
        res.send({status: 'success', payload: result})
    } catch (error) {
        console.log('Cannot delete the product with mongoose: '+error);
        res.status(400).json({ status: "error", message: error.message });
    }
}