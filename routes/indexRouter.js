const express = require("express");
const router = express.Router();
const productModel = require("../models/product");

const { isLoggedin } = require("../middlewares/isLoggedin");

router.get("/", function (req, res) {
    let error = req.flash("error")
    res.render("login", { error })
});

router.get("/users/shop", isLoggedin, async function (req, res) {
    let error = req.flash("error")
    let success = req.flash("success");
    let search = req.query.search || "";

    let category = req.query.category || "";

    let query = {};

    if (category) {
        query.category = category;
    }

    if (search) {
        query.name = {
            $regex: search,
            $options: "i",
        };
    }

    let products = await productModel.find(query);

    res.render("shop", { products, error, success });
})

router.get("/users/register", function (req, res) {
    let error = req.flash("error");
    res.render("register", { error });
})

module.exports = router;