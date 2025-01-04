import express from "express";
import { getProducts, createProduct, deleteProduct, uptdateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts)

router.post("/", createProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", uptdateProduct)


export default router;