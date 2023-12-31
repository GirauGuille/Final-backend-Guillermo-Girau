import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { ROLE_ADMIN } from './users.model.js';


const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: Boolean,
    required: true,
  },
  owner: {
    type: String,
    default: ROLE_ADMIN,
  },
}).plugin(paginate);

export const productModel = mongoose.model('Products', productsSchema);
