'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EventUser extends Model {
    static associate(models) {
    }
  }

  EventUser.init(
    {
      userId: DataTypes.INTEGER,
      eventId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'EventUser',
    }
  );

  return EventUser;
};
