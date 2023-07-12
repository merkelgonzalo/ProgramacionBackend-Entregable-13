import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        require: true
    },
    description: String,
    price: {
        type: Number,
        require: true
    },
    thumbnail: String,
    code: {
        type: String,
        unique: true
    },
    stock: Number,
    category: {
        type: String,
        require: true
    },
    status: Boolean
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);