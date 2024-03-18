import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
// TODO import your schema here
import Product from "./product-schema.js";


// Hardcoded products list for testing
const products = [
  { name: "Abra", cost: 180, image: "/images/Abra.png" },
  { name: "Clefairy", cost: 500, image: "/images/Clefairy.png" },
  { name: "Nidorina", cost: 1200, image: "/images/Nidorina.png" },
  { name: "Dratini", cost: 2800, image: "/images/Dratini.png" },
  { name: "Scyther", cost: 5500, image: "/images/Scyther.png" },
  { name: "Porygon", cost: 9999, image: "/images/Porygon.png" }
];

// This is a standalone program which will populate the database with initial data.
async function run() {
  console.log("Connecting to database...");
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

  // TODO Clear db
  await Product.deleteMany({});
  console.log("Database cleared!");

  // TODO insert all products defined above
  await Product.insertMany(products);
  console.log("Products inserted!");

  await mongoose.disconnect();
  console.log("Done!");
}

run();
