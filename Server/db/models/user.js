'use strict';
const { Model } = require('sequelize');
// Импортируем модель EventMessage
module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    static associate(models) {
      User.hasMany(models.Event, { foreignKey: 'userId' });
      User.belongsToMany(models.Event, { through: models.EventUser, foreignKey: 'userId' });
      User.hasMany(models.Message, { foreignKey: 'userId' });
      User.hasMany(models.EventMessage, { foreignKey: 'userId' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    city: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  
  return User;
};
