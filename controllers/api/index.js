const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');
const userRoutes = require("./userRoutes");
const cartRoutes = require("./cartRoutes");


router.use("/users", userRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
