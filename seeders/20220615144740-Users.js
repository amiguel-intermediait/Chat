'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id : 1,
      user_name: 'baba',
      email: 'baba@baba.com',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id : 2,
      user_name: 'carpa',
      email: 'carpa@carpa.com',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id : 3,
      user_name: 'pato',
      email: 'pato@pato.com',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id : 4,
      user_name: 'fran',
      email: 'fran@fran.com',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};