const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product");
const { CATEGORIES, SIZES } = require("../constants/productConstants");
const validateProduct = require("../middlewares/productValidators");

router.get("/", function (req, res) {
    res.send("KINJALNIRMAL")
})

router.get("/create", function (req, res) {
    res.render("createproducts", {
        error: req.flash("error"),
        success: req.flash("success"),
        categories: CATEGORIES,
        sizes: SIZES
    });
})

router.post("/create", upload.single("image"), validateProduct, async function (req, res) {
    let { name,
        description,
        price,
        discount,
        category,
        sizes,
        stock,
    } = req.body;

    if (sizes && !Array.isArray(sizes)) {
        sizes = [sizes];
    };


    try {
        await productModel.create({
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            },
            name,
            description,
            price,
            discount,
            category,
            sizes,
            stock,
        });
        req.flash("success", "Product succesfully created");
        res.redirect("/owners/admin");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/products/create");
    }

})

module.exports = router;