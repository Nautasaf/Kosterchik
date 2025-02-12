'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EventUser extends Model {
    static associate(models) {
      EventUser.belongsTo(models.User, { foreignKey: 'userId' });
  
     
      EventUser.belongsTo(models.Event, { foreignKey: 'eventId' });
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
