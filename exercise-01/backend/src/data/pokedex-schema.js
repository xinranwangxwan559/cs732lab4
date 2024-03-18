import mongoose from 'mongoose';

const pokedexSchema = new mongoose.Schema({
  dexNumber: Number,
  name: String,
  imageUrl: String,
  dexEntry: String
});

const PokedexEntry = mongoose.model('PokedexEntry', pokedexSchema);

export default PokedexEntry;
