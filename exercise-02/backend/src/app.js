// Configure environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import productRoutes from "./routes/api/products.js"; // Import productRoutes

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

// Serve up the product routes
app.use("/api/products", productRoutes);

app.listen(PORT, () => console.log(`App server listening on port ${PORT}!`));
