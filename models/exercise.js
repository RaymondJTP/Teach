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
    question: DataTypes.TEXT,
    answer: DataTypes.STRING,
    answer2: DataTypes.STRING,
    answer3: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};