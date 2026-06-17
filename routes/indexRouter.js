const express = require("express");
const router = express.Router();

const { isLoggedin } = require("../middlewares/isLoggedin");

router.get("/", function (req, res) {
    let error = req.flash("error")
    res.render("login", { error })
});

router.get("/users/shop", isLoggedin, function (req, res) {
    res.render("shop");
})

router.get("/users/register", function (req, res) {
    let error = req.flash("error");
    res.render("register", { error });
})

module.exports = router;