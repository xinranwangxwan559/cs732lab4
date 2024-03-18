import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
