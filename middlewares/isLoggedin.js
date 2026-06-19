const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

const isLoggedin = async function (req, res, next) {
    if (!req.cookies.token) {
        req.flash("error", "You have to login first");
        return res.redirect("/");
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({ email: decoded.email });

        req.user = user;

        next();

    } catch (err) {
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
}

module.exports.isLoggedin = isLoggedin;