const mongoose = require("mongoose");
const debug = require("debug")("development:mongoose");
mongoose
    .connect(`${process.env.MONGODB_URI}/${process.env.DATABASE}`)
    .then(function () {
        debug("connected");
    })
    .catch(function (err) {
        debug(err);
    })

module.exports = mongoose.connection;