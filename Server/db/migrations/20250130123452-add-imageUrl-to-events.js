'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Events', 'imageUrl', {
      type: Sequelize.STRING,
      allowNull: true, // Можно оставить null, чтобы не было обязательным
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Events', 'imageUrl');
  },
};