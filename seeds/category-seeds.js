const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
  {
    category_name:'Jackets and coats',
  },
  {
    category_name:'Sweatshirts',
  },
  {
    category_name:'Waterproofs',
  },
  {
    category_name:'jeans',
  },
  {
    category_name:'Joggers',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
