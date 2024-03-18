import express from "express";
import { pokemon } from "../data/pokemon.js";

const router = express.Router();

// A dummy route which will simply return the text "Hello, World".
router.get("/api/hello", (req, res) => {
  return res.send("Hello, World");
});

router.get("/api/pokemon", (req, res) => {
  const allPokemon = pokemon.map(({ dexNumber, name }) => ({ dexNumber, name }));
  return res.json(allPokemon);
});

router.get("/api/pokemon/:dexNumber", (req, res) => {
  const { dexNumber } = req.params;
  const match = pokemon.find((pokemon) => pokemon.dexNumber === parseInt(dexNumber));

  if (match) return res.json(match);
  return res.sendStatus(404);
});

export default router;
