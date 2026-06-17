const mongoose = require("mongoose");
const { CATEGORIES, SIZES } = require("../constants/productConstants");

const productSchema = mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
    category: {
        type: String,
        required: true,
        enum: CATEGORIES,
        trim: true,
    },
    sizes: [{
        type: String,
        enum: SIZES,
    }],
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
},
    {
        timestamps: true,
    }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;

