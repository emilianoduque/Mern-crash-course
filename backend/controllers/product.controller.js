import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success:true, data: products})
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const createProduct = async(req,res) => {
    const product = req.body //el usuario mandará estos datos

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message: "Please provide all fields"})
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({success:false, message: "Server Error"});
    }
};

export const deleteProduct = async(req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id"})
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    } catch (error) {
        console.log("Error in deleting product")
        res.status(500).json({succes: false,message: "Server Error"});
    }
};

export const uptdateProduct = async(req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id"})
    }
    
    try {
        const uptdatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: uptdatedProduct});
    } catch (error) {
        res.status(500).json({sucess: false, message: "Server Error"});
    }
};
