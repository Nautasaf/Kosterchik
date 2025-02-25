'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('event_messages', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // Связь с таблицей users
          key: 'id',       // Внешний ключ на поле id в таблице users
        },
        onDelete: 'CASCADE', // При удалении пользователя, удаляются и его сообщения
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Events',  // Связь с таблицей events
          key: 'id',        // Внешний ключ на поле id в таблице events
        },
        onDelete: 'CASCADE', // При удалении события, удаляются и его сообщения
      },
      text: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('event_messages');
  }
};