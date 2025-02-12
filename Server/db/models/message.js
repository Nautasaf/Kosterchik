'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // (1) Message принадлежит User
      Message.belongsTo(models.User, { foreignKey: 'userId' });
      // (2) Message принадлежит Event
      Message.belongsTo(models.Event, { foreignKey: 'eventId' });
    }
  }

  Message.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Обязательно для записи
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Обязательно для записи
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,  // Сообщение обязательно
      },
    },
    {
      sequelize,
      modelName: 'Message',
      timestamps: true, // Автоматическая поддержка createdAt и updatedAt
      underscored: true, // Если хотите использовать snake_case для полей
    }
  );

  return Message;
};