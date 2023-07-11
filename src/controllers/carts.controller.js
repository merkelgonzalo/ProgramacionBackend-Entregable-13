import { cartService } from "../repository/index.js";
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export const getCartsController = async (req, res) => {
    try {
        let limit = req.query.limit;
        let result = await cartService.getCarts(req);
        if (limit != undefined) {
            result = result.slice(0, limit);
        }
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log('Cannot get carts with mongoose: ' + error)
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const getCartController = async (req, res) => {
    try {
        let result = await cartService.getCartById(req.params.cid);
        if (result.length === 0) res.status(400).json({ status: "error", error: "ID NOT FOUND" });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log('Cannot get the cart with mongoose: ' + error)
        res.status(400).json({ message: error });
    }
}

export const createCartController = async (req, res) => {
    try {
        let result = await cartService.addCart();
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log('Cannot create cart with mongoose: ' + error)
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const addProductController = async (req, res) => {
    try {
        console.log("cart " + req.params.cid);
        console.log("product " + req.params.pid);
        if (!ObjectId.isValid(req.params.cid) || !ObjectId.isValid(req.params.pid)) {
            return res.status(400).json({ status: "error", error: "ID NOT FOUND" });;
        }
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const quantityBody = req.body.quantity || 1;
        const result = await cartService.addProduct(idCart, idProduct, quantityBody);
        if (result === 0) return res.status(400).json({ status: "error", error: "ID NOT FOUND" });
        if (result === 1) return res.status(400).json({ status: "error", error: "OUT OF STOCK" });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log('Cannot add product with mongoose: ' + error)
        res.status(400).json({ status: "error", message: error.message });
    }
}

export const deleteProductController = async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const result = await cartService.deleteProductById(idCart, idProduct);
        if (result === 0) return res.status(400).json({ status: "error", error: "ID NOT FOUND" });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log('Cannot delete product with mongoose: ' + error)
        res.status(400).json({ status: "error", message: error.message });
    }
}

export const deleteProductsController = async (req, res) => {
    try {
        const idCart = req.params.cid;
        const result = await cartService.deleteCart(idCart);
        if (result === 0) return res.status(400).json({ status: "error", error: "ID NOT FOUND" });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log('Cannot delete product with mongoose: ' + error)
        res.status(400).json({ status: "error", message: error.message });
    }
}

export const updateProductsController = async (req, res) => {
    try {
        const cid = req.params.cid;
        if (!ObjectId.isValid(cid)) {
            return res.status(400).json({ status: "error", error: "ID NOT FOUND" });;
        }
        const products = req.body.products;
        const result = await cartService.updateCart(cid, products);
        if (result === 0) return res.status(400).json({ status: "error", error: "ID NOT FOUND" });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log('Cannot delete product with mongoose: ' + error)
        res.status(400).json({ status: "error", message: error.message });
    }
}

export const updateProductController = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        if (!ObjectId.isValid(cid) || !ObjectId.isValid(pid)) {
            return res.status(400).json({ status: "error", error: "ID NOT FOUND" });;
        }
        const quantity = req.body.quantity;
        const result = await cartService.updateProduct(cid, pid, quantity);
        if (result === 0) return res.status(400).json({ status: "error", error: "ID NOT FOUND" });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log('Cannot add product with mongoose: ' + error)
        res.status(400).json({ status: "error", message: error.message });
    }
}

export const buyCartController = async (req, res) => {
    try {
        let cartId = req.params.cid;
        let result = await cartService.buyCart(cartId);
        //VER
        // if (result === []) return res.status(400).json({ status: "error", error: "ID NOT FOUND" });
        // if (result === []) return res.status(400).json({ status: "error", error: "OUT OF STOCK" });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log('Cannot buy cart with mongoose: ' + error)
        res.status(500).json({ status: "error", message: error.message });
    }
}