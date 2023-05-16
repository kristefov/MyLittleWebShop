const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Cart extends Model {}

// write me cart logic bljad
Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    session_id: {
        type: DataTypes.STRING,
        allowNull: false

      },
    user_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: {
        model: 'product',
        key: 'id',
      }
    },

  }, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'cart',
  });

module.exports = Cart