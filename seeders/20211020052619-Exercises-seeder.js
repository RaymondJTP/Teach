'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Exercises', [
      {
        question: 'Berapakah hasil pertambahan 1 +3?',
        answer: '4',
        answer2: '10',
        answer3: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
        TeacherId: 1,
        CategoryId: 1
      },
      {
        question: 'Berapakah hasil pertambahan 2 x 5?',
        answer: '10',
        answer2: '30',
        answer3: '25',
        createdAt: new Date(),
        updatedAt: new Date(),
        TeacherId: 2,
        CategoryId: 1
      },
      {
        question: 'Akar pangkat 4 dari 81?',
        answer: '3',
        answer2: '9',
        answer3: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        TeacherId: 1,
        CategoryId: 2
      },
      {
        question: 'Berapa banyak bintang di langit?',
        answer: 'Tak terhingga',
        answer2: 'Sebanyak pasir di pantai',
        answer3: '10000',
        createdAt: new Date(),
        updatedAt: new Date(),
        TeacherId: 1,
        CategoryId: 3
      },
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Exercises', null)

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
