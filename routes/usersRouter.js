const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutuser } = require("../controllers/authController");

router.get("/", function (req, res) {
    res.send("KINJALNIRMAL")
})

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", function (req, res) {
    res.render("register");
})

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutuser);

module.exports = router;