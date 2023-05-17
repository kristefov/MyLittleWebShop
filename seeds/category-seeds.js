const { Category } = require("../models");

const categoryData = [
  {
    category_name: "Shirts",
  },
  {
    category_name: "Shorts",
  },
  {
    category_name: "Music",
  },
  {
    category_name: "Hats",
  },
  {
    category_name: "Shoes",
  },
  {
    category_name: "Jackets and coats",
  },
  {
    category_name: "Sweatshirts",
  },
  {
    category_name: "Waterproofs",
  },
  {
    category_name: "jeans",
  },
  {
    category_name: "Joggers",
  },
  {
    category_name:'Swim shorts',
  },
  {
    category_name:'Trousers',
  },
  {
    category_name:'Backpacks and rucksacks',
  },
  {
    category_name:'Gloves',
  },
  {
    category_name:'Mens watches',
  },
  {
    category_name:'polo shirts',
  },
  {
    category_name:'Vests',
  },
  {
    category_name:'Socks',
  },
  {
    category_name:'underwear',
  },
  {
    category_name:'Sports equipment',
  },
  {
    category_name:'training and gym equipment',
  },
  {
    category_name:'Water bottles and hydration',
  }
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
