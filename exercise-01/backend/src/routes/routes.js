import express from "express";
import PokedexEntry from "../data/pokedex-schema.js";

const router = express.Router();

// A dummy route which will simply return the text "Hello, World".
router.get("/api/hello", (req, res) => {
  return res.send("Hello, World");
});

router.get("/api/pokemon", async (req, res) => {
  try {
    const allPokemon = await PokedexEntry.find({}, 'dexNumber name'); 
    res.json(allPokemon);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/api/pokemon/:dexNumber", async (req, res) => {
  try {
    const { dexNumber } = req.params;
    const match = await PokedexEntry.findOne({ dexNumber: parseInt(dexNumber) });

    if (match) {
      res.json(match);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;