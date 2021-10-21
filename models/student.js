'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Student.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Student cannot be empty'
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
        var hash = bcrypt.hashSync(instance.password, salt);
        // console.log('asuuup', salt, instance.password);
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'Student',
  });
  return Student;
};