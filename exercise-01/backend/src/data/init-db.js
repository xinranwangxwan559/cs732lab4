// TODO Read in .env file

import mongoose from "mongoose";
import { pokemon } from "./pokemon.js";

// This is a standalone program which will populate the database with initial data.
async function run() {
  console.log("Connecting to database...");
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING); // Connect using the connection string obtained from the environment

  console.log("Clearing db...");
  // TODO Clear the database by deleting all Pokedex entries

  console.log("Adding data...");
  // TODO Insert all of the pokemon in pokemon.js (imported above)

  await mongoose.disconnect();
  console.log("Done!");
}

run();
