'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserFavorite extends Model {
    static associate(models) {
      UserFavorite.belongsTo(models.User, { foreignKey: 'userId' });
      UserFavorite.belongsTo(models.Event, { foreignKey: 'eventId' });
    }
  }

  UserFavorite.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserFavorite',
    }
  );

  return UserFavorite;
};