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
        // 🗓 Дата начала события
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        // 🗓 Дата окончания события (может быть null)
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
        // 🎨 Фон события
        type: DataTypes.STRING,
        allowNull: true,
      },
      requirements: {
        // 📌 Требования к участникам
        type: DataTypes.TEXT,
        allowNull: true,
      },
      maxPeople: {
        // Максимальное число человек
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      price: {
        // 💰 Цена билета (null = бесплатно)
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      event_type: {
        // 🎭 Тип события (концерт, выставка, конференция и т.д.)
        type: DataTypes.STRING,
        allowNull: true,
      },
      age_restriction: {
        // 🔞 Возрастное ограничение (0+, 6+, 12+, 18+)
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      duration: {
        // ⏳ Длительность в минутах
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      district: {
        // 📍 Район города (для крупных городов)
        type: DataTypes.STRING,
        allowNull: true,
      },
      format: {
        // 🏠 Формат (онлайн / оффлайн)
        type: DataTypes.STRING,
        allowNull: true,
      },
      language: {
        // 🌍 Язык события
        type: DataTypes.STRING,
        allowNull: true,
      },
      accessibility: {
        // ♿️ Доступность для людей с ОВЗ
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      rating: {
        // ⭐️ Средний рейтинг события
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
      },
      organizer: {
        // 🏢 Организатор события
        type: DataTypes.STRING,
        allowNull: true,
      },
      popularity: {
        // 🔥 Популярность (число посещений)
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
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
      timestamps: true, // createdAt и updatedAt
    },
  );

  return Event;
};
