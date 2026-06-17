// const productModel = require("../models/product");
// const multer = require("../config/multer-config");

// const product = async function (req, res) {
//     let {
//         name, description, price, discount, category, sizes, stock,
//     } = req.body

//     let product = await productModel.create({
//         image: req.file.buffer,
//         name,
//         description,
//         price, discount,
//         category,
//         sizes,
//         stock,
//     })

//     res.send(product);
// };

// module.exports = product;