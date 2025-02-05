module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Events', 'start_date', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn('Events', 'end_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('Events', 'price', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Events', 'event_type', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Events', 'age_restriction', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Events', 'duration', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Events', 'district', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Events', 'format', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Events', 'available_seats', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Events', 'language', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Events', 'accessibility', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.addColumn('Events', 'rating', {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    });
    await queryInterface.addColumn('Events', 'organizer', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Events', 'popularity', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Events', 'start_date');
    await queryInterface.removeColumn('Events', 'end_date');
    await queryInterface.removeColumn('Events', 'price');
    await queryInterface.removeColumn('Events', 'event_type');
    await queryInterface.removeColumn('Events', 'age_restriction');
    await queryInterface.removeColumn('Events', 'duration');
    await queryInterface.removeColumn('Events', 'district');
    await queryInterface.removeColumn('Events', 'format');
    await queryInterface.removeColumn('Events', 'available_seats');
    await queryInterface.removeColumn('Events', 'language');
    await queryInterface.removeColumn('Events', 'accessibility');
    await queryInterface.removeColumn('Events', 'rating');
    await queryInterface.removeColumn('Events', 'organizer');
    await queryInterface.removeColumn('Events', 'popularity');
  }
};