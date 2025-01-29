'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // (1) User -> Event (один-ко-многим): userId = автор
      User.hasMany(models.Event, { foreignKey: 'userId' });
      // (2) User <-> Event (многие-ко-многим через EventUser)
      User.belongsToMany(models.Event, {
        through: models.EventUser,
        foreignKey: 'userId',
      });
      // (3) User -> Message (один-ко-многим)
      User.hasMany(models.Message, { foreignKey: 'userId' });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
