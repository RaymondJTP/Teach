'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Exercises', 
      'TeacherId', 
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Teachers"
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
      );
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Exercises',
      'TeacherId',
      {}
    )
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
