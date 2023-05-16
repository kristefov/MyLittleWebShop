const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const User = require('./User');
const Cart = require('./Cart');


// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
})
// Products belongsTo User
Product.belongsTo(User, {
  foreignKey: "user_id",
})
// Categories have many Products
Category.hasMany(Product)
// User have many Products
User.hasMany(Product)
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, 
  foreignKey: "tag_id",
})
Cart.belongsTo(User, {
  foreignKey: "user_id",
})
User.hasOne(Cart, {
  foreignKey: "user_id",
})

Product.belongsToMany(Cart, {
  through: Cart,
  foreignKey: "product_id",
  })
Cart.hasMany(Product, {
  foreignKey: "product_id",
})


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
  User,
  Cart
};
