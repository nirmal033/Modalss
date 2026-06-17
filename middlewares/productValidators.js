function validateProduct(req, res, next) {

    const data = req.body;

    console.log(req.body);

    console.log(req.file);
    if (!req.file) {
        req.flash("error", "Product image is required");
        return res.redirect("/products/create");
    }

    if (!data.name) {
        req.flash("error", "Product name is required");
        return res.redirect("/products/create");
    }

    if (!data.description) {
        req.flash("error", "Product description is required");
        return res.redirect("/products/create");
    }
    if (!data.price) {
        req.flash("error", "Product name is required");
        return res.redirect("/products/create");
    }

    if (data.price < 0) {
        req.flash("error", "Price cannont be negative or zero");
        return res.redirect("/products/create");
    }

    if (!data.category) {
        req.flash("error", "Product category is required");
        return res.redirect("/products/create");
    }
    if (!data.sizes) {
        req.flash("error", "Product sizes is required");
        return res.redirect("/products/create");
    }
    if (!data.stock) {
        req.flash("error", "Product stock is required");
        return res.redirect("/products/create");
    }

    if (data.stock < 0) {
        req.flash("error", "Stock cannot be negative or zero");
        return res.redirect("/products/create");
    }

    next();

}

module.exports = validateProduct; 