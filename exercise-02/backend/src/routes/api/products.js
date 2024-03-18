import express from "express";
import Product from "../../db/product-schema.js";

const router = express.Router();

// Hardcoded products list for testing

// Serve up all products on a GET call to /
router.get("/", async (req, res) => {

  try {
    const products = await Product.find({});
    res.json(products);
  }catch (error){
    res.status(500).json({message: error.message});
  }
}
);

export default router;
