const express = require("express");
const router = express.Router();
const cartModel = require("../models/cart");
const { isLoggedin } = require("../middlewares/isLoggedin");

console.log("Cart router loaded");

router.get("/", isLoggedin, async function (req, res) {

    try {
        let error = req.flash("error")
        let success = req.flash("success");
        const userId = req.user._id;

        let cart = await cartModel.findOne({ user: userId }).populate("products.productId");
        res.render("cart", { cart, error, success });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/users/shop");
    }
})

router.post("/add/:productId", isLoggedin, async function (req, res) {
    console.log("POST ROUTE HIT");
    try {
        const userId = req.user._id;
        const productId = req.params.productId;

        // 1. Find Cart
        let cart = await cartModel.findOne({ user: userId });

        // 2. if No cart -> create a cart
        if (!cart) {
            cart = await cartModel.create({
                user: userId,
                products: []
            });
        }

        // 3. Check product already existed
        const existingProduct = cart.products.find(
            p => p.productId.toString() === productId
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({
                productId,
                quantity: 1,
            })
        }

        await cart.save();
        req.flash("success", "Added to cart");
        res.redirect("/cart");

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/users/shop");
    }
})

router.post("/remove/:productId", isLoggedin, async function (req, res) {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;

        let cart = await cartModel.findOne({
            user: userId,
        })

        cart.products = cart.products.filter(
            p => p.productId.toString() !== productId
        );

        await cart.save();

        req.flash("success", "Product removed succesfully");
        res.redirect("/cart");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/cart");
    }
})

module.exports = router;