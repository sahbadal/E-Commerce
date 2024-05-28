import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    size:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
