'use strict';
const {
  Model
} = require('sequelize');
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
  };
  Exercise.init({
    question: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'question cannot be empty'
        }
      }
    },
    answer: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'answer cannot be empty'
        }
      }
    },
    answer2: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'answer2 cannot be empty'
        }
      }
    },
    answer3: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'answer2 cannot be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};