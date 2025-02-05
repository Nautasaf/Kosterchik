'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Events', 'latitude', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 55.751244,
    });
    await queryInterface.addColumn('Events', 'longitude', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 37.618423,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Events', 'latitude');
    await queryInterface.removeColumn('Events', 'longitude');
  }
};
