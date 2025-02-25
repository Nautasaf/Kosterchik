'use strict';

module.exports = (sequelize, DataTypes) => {
  const EventMessage = sequelize.define('EventMessage', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'event_messages',
    underscored: true,
    timestamps: true,
  });

  EventMessage.associate = function(models) {
    // Определяем связи с другими моделями
    EventMessage.belongsTo(models.User, { foreignKey: 'user_id' });
    EventMessage.belongsTo(models.Event, { foreignKey: 'event_id' });
  };

  return EventMessage;
};