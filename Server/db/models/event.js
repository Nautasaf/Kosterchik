'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // (1) Event принадлежит одному User (создателю)
      Event.belongsTo(models.User, { foreignKey: 'userId' });
      // (2) Event <-> User (участники)
      Event.belongsToMany(models.User, {
        through: models.EventUser,
        foreignKey: 'eventId',
      });
      // (3) Event -> Message (один-ко-многим)
      Event.hasMany(models.Message, { foreignKey: 'eventId' });
    }
  }

  Event.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      city: DataTypes.STRING,
      date: DataTypes.DATE,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      background: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      requirements: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 55.751244,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 37.618423,
      },
    },
    {
      sequelize,
      modelName: 'Event',
    },
  );

  return Event;
};
