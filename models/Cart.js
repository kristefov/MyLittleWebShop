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

<<<<<<< HEAD
  }, {
    sequelize,
    timestamps: true,
=======
  },
  {
    sequelize,
    timestamps: false,
>>>>>>> 30dc35061c3d702a6ccf4200e7b161809aabb423
    freezeTableName: true,
    underscored: true,
    modelName: 'cart',
  });

module.exports = Cart