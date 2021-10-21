'use strict';
const {
  Model
} = require('sequelize');

const moment = require('moment')
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exercise.belongsTo(models.Teacher)
      Exercise.belongsTo(models.Category)
      
    }

    get formatCreateDate(){
      return moment(this.createdAt).fromNow()
    }

    get formatUpdateDate(){
      return moment(this.updatedAt).fromNow()
    }
    
  };
  Exercise.init({
    question: {
      type: DataTypes.TEXT,
      validate : {
        notEmpty: {
          msg : 'Please enter the question'
        }
      }
    },
    answer:{
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          msg : 'Please enter the correct answer'
        }
      }
    },
    answer2: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          msg : 'Please enter the false answer'
        }
      }
    } ,
    answer3: {
      type : DataTypes.STRING,
      validate : {
        notEmpty: {
          msg : 'Please enter the false answer'
        }
      }
    } 
  }, {
    // hooks: {
    //   beforeCreate: (instance, options) => {
    //     console.log('Before');
    //   },
    //   afterCreate: (instance, options) => {
    //     sequelize.models.Category.update({
    //       duration: duration + 5,
    //       where: {id : instance.CategoryId}
    //     })
    //   }
    // },
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};