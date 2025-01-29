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
      userId: DataTypes.INTEGER,
      eventId: DataTypes.INTEGER,
      text: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Message',
    }
  );

  return Message;
};
