'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Exercise)
      
    }
  };
  Category.init({
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Category cannot be empty'
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'duration cannot be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};