import mongoose from "mongoose";
import productModel from "../models/product.model.js";

export const getProducts =  async (req, res) => {
      try {
            const products = await productModel.find({})
            res.status(200).json({success: true, message: "Products fetched successfully", data: products})
      } catch (error) {
            res.status(500).json({ success: false, message: "Server Error" });
      }
}

export const createProduct = async (req, res) => {
      const product = req.body;

      if(!product.name || !product.image || !product.price) {
            return res.status(400).json({success: false, message: "Please fill all the fields"})
      }
      
      const newProduct = new productModel(product);

      try {
            await newProduct.save();
            res.status(201).json({success: true, message: "Product created successfully", data: newProduct});
      } catch (error) {
            res.status(500).json({ success: false, message: "Server Error" });
      }
}

export const updateProduct = async (req, res) => {
      const {id} = req.params;
      const product = req.body;

      if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({success: false, message: "Invalid Product ID"})
      }

      try {
            const updatedProduct = await productModel.findByIdAndUpdate(id, product, {new: true});
            res.status(200).json({success: true, message: "Product updated successfully", data: updatedProduct});
      } catch (error) {
            res.status(500).json({ success: false, message: "Server Error" });
      }     
}

export const deleteProduct = async (req, res) => {
      const {id} = req.params;

      if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({success: false, message: "Invalid Product ID"})
      }

      try {
            await productModel.findByIdAndDelete(id);
            res.status(200).json({success: true, message: "Product deleted successfully"});
      } catch (error) {
            res.status(500).json({ success: false, message: "Server Error" });
      }      
}