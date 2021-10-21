'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Exercises', 
      'CategoryId', 
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Categories"
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
      'CategoryId',
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
