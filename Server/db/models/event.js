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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
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
      maxPeople: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      event_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      age_restriction: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      format: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accessibility: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
      },
      organizer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      popularity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        // Значение будет передано из запроса, поэтому defaultValue не задаём
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        // Значение будет передано из запроса
      },
      markerIcon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Event',
      timestamps: true,
    }
  );

  return Event;
};
