const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    products: {
        type: Array,
        default: [],
    },
    picture: Number,
    gstin: String,
});

const ownerModel = mongoose.model("owner", ownerSchema);

module.exports = ownerModel;