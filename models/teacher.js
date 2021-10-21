'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Teacher.hasMany(models.Exercise)

    }
  };
  Teacher.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Username cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate(instance,options){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync("B4c0/\/", salt);
      }
    },
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};