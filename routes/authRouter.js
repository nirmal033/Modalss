// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // userModel
// const userModel = require("../models/user");

// // ========================== Register ==============================

// router.post("/register", async (req, res) => {
//     try {
//         let { email, password } = req.body
//         let user = await userModel.findOne({ email });

//         if (user) {
//             return res.status(400).json({
//                 message: "user already existed",
//             })
//         }
//         else {
//             bcrypt.genSalt(12, function (err, salt) {
//                 bcrypt.hash(password, salt, async function (err, hash) {
//                     let userCreated = await userModel.create({
//                         email,
//                         password: hash,
//                     })

//                     let token = jwt.sign({ email, id: userCreated._id }, process.env.JWT_KEY);
//                     res.cookie("token", token);

//                     res.status(200).json({
//                         message: "User created succesfully",
//                         user: userCreated,
//                     })
//                 })
//             })
//         }
//     } catch (err) {
//         res.status(500).json({
//             error: err.message,
//         })
//     }
// })

// module.exports = router;