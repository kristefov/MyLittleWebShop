const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const User = require('./User');


// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "SET NULL"
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


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
  User
};
