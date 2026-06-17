const userModel = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

const registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({ email });

        if (user) return res.status(400).json({
            message: "User already existed",
        })

        bcrypt.genSalt(12, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err);
                else {
                    let userCreated = await userModel.create({
                        email,
                        fullname,
                        password: hash,
                    });

                    let token = generateToken(userCreated);
                    res.cookie("token", token, {
                        httpOnly: true,
                    });
                    res.redirect("/users/shop");

                }
            })
        })


    } catch (err) {
        res.send(err.message);
    }
}

const loginUser = async function (req, res) {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });

    if (!user) {
        req.flash("error", "Email or password incorrect");
        return res.redirect("/");
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token, {
                httpOnly: true,
            });
            res.redirect("/users/shop");
        } else {
            req.flash("error", "Email or password incorrect");
            res.redirect("/");
        }
    })

}

const logoutuser = function (req, res) {
    res.clearCookie("token");
    req.flash("success", "logout succesfully");
    res.redirect("/");
}

module.exports = {
    registerUser,
    loginUser,
    logoutuser
};