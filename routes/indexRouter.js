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
    let products = await productModel.find();
    res.render("shop", { products, error, success });
})

router.get("/users/register", function (req, res) {
    let error = req.flash("error");
    res.render("register", { error });
})

module.exports = router;