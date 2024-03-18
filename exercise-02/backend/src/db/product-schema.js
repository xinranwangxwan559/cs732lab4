import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  cost: Number,
  image: String
});

const Product = mongoose.model('Product', productSchema);

export default Product;
