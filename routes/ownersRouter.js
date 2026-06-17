const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner");
const upload = require("../config/multer-config");
const multer = require("../config/multer-config");
const { CATEGORIES, SIZES } = require("../constants/productConstants");

if (process.env.NODE_ENV === "development") {
    router.post("/create", async function (req, res) {
        let owners = await ownerModel.find();

        if (owners.length > 0) {
            return res
                .status(503)
                .send("You don't have permission to create a new owner");
        }

        let { fullname, email, password } = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });

        res.send(createdOwner);
    })
}

router.get("/", function (req, res) {
    res.send("KINJALNIRMAL");
})

router.get("/admin", function (req, res) {
    res.render("admidashboard");
})

router.get("/admin/create", function (req, res) {
    res.render("createproducts", {
        categories: CATEGORIES,
        sizes: SIZES,
    });
})

module.exports = router;