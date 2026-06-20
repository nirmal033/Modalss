const express = require("express");
const router = express.Router();
const cartModel = require("../models/cart");
const { isLoggedin } = require("../middlewares/isLoggedin");

// ============================ View cart ==============================================

router.get("/", isLoggedin, async function (req, res) {

    try {
        let error = req.flash("error")
        let success = req.flash("success");
        let bill = 0;
        const userId = req.user._id;

        let cart = await cartModel.findOne({ user: userId }).populate("products.productId");

        if (cart) {
            cart.products.forEach(function (item) {
                bill = item.productId.price * item.quantity;
            })
        }
        res.render("cart", { cart, error, success, bill });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/users/shop");
    }
})

// ============================== Add to cart ==============================================

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

// ============================ Remove product ==============================================

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

// ============================ increase quantity of product ==============================================

router.post("/increase/:productId", isLoggedin, async function (req, res) {
    try {
        console.log("working");
        const userId = req.user._id;
        const productId = req.params.productId;

        let cart = await cartModel.findOne({ user: userId });

        let product = cart.products.find(
            p => p.productId.toString() === productId,
        )

        if (product) {
            product.quantity += 1;
        }
        await cart.save();
        res.redirect("/cart");
    } catch (err) {
        req.flash("error", "Something wend wrong. Try after sometimes");
        res.redirect("/cart");
    }
})

// ============================ decrease quantity of product ==============================================

router.post("/decrease/:productId", isLoggedin, async function (req, res) {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;

        let cart = await cartModel.findOne({
            user: userId,
        })

        let product = cart.products.find(
            p => p.productId.toString() === productId,
        )

        console.log("Product ID:", productId);
        console.log("Found Product:", product);
        if (product && product.quantity > 1) {
            product.quantity -= 1;
        }

        await cart.save();
        res.redirect("/cart");

    } catch (err) {
        req.flash("error", "something went wrong. Try after sometimes");
        res.redirect("/cart");
    }
})

module.exports = router;