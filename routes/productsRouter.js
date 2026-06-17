const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
// const productModel = 

router.get("/", function (req, res) {
    res.send("KINJALNIRMAL")
})

router.post("/create", upload.single("image"), function (req, res) {

})

module.exports = router;