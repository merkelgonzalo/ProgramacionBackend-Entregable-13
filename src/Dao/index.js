import { dbConnection } from "../config/dbConnection.js";
//import { UserMongo } from "./managers/";
import { ProductManager } from "./managers/ProductManager.js";
import { CartManager } from "./managers/CartManager.js";

dbConnection();
//export const userDao = new UserMongo();
export const productManager = new ProductManager();
export const cartManager = new CartManager();