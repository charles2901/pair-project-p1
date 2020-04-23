'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Items', [
      {
        name: 'Kopi Kapal Api',
        stock : 10,
        price : 3000,
        path : '/img/kopikapalapi.jpg',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Apel',
        stock : 25,
        price : 10000,
        path : '/img/apel.jpg',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Tepung Kue',
        stock : 30,
        price : 4000,
        path : '/img/tepungkue.jpg',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Gandum Segitiga Biru',
        stock : 50,
        price : 35000,
        path : '/img/gandumsegitigabiru.jpg',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Minyak Bimoli',
        stock : 99,
        price : 10500,
        path : '/img/minyakbimoli.jpg',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Jeruk',
        stock : 100,
        price : 9000,
        path : '/img/jeruk.jpg',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Beras Sumo',
        stock : 75,
        price : 14000,
        path : '/img/berassumo.jpg',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Kacang Dua Kelinci',
        stock : 25,
        price : 7000,
        path : '/img/kacangkelinci.jpg',
        createdAt : new Date(),
        updatedAt : new Date()
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Items', null, {});
  }
};
