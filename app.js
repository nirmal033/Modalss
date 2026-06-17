require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("connect-flash");

// DB Connection
const db = require("./config/mongoose-connection");

// Routes
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/indexRouter");
// const authRouter = require("./routes/authRouter");


// ================================= VIEW ENGINE ===========================================
app.set("view engine", "ejs");

// ================================= MIDDLEWARES ===========================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// =================================== ROUTES ==============================================
app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// API AUTH Router
// app.use("/api/auth", authRouter);

// Simple Page Route
app.get("/", function (req, res) {
    res.send("Hey");
})

// =================================== SERVER ===============================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`Server is running on ${PORT}`)
})