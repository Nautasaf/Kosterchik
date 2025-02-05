'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // (1) Event принадлежит одному User (создателю)
      Event.belongsTo(models.User, { foreignKey: 'userId' })
      // (2) Event <-> User (участники)
      Event.belongsToMany(models.User, {
        through: models.EventUser,
        foreignKey: 'eventId',
      })
      // (3) Event -> Message (один-ко-многим)
      Event.hasMany(models.Message, { foreignKey: 'eventId' })
    }
  }

  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
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
      start_date: { // 🗓 Дата начала события
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: { // 🗓 Дата окончания события (может быть null)
        type: DataTypes.DATE,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      background: { // 🎨 Фон события
        type: DataTypes.STRING,
        allowNull: true,
      },
      requirements: { // 📌 Требования к участникам
        type: DataTypes.TEXT,
        allowNull: true,
      },
      people: {
        // количество людей на данный момент
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxPeople: {
        // Максимально число человек
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: { // 💰 Цена билета (null = бесплатно)
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      event_type: { // 🎭 Тип события (концерт, выставка, конференция и т.д.)
        type: DataTypes.STRING,
        allowNull: false,
      },
      age_restriction: { // 🔞 Возрастное ограничение (0+, 6+, 12+, 18+)
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      duration: { // ⏳ Длительность в минутах
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      district: { // 📍 Район города (для крупных городов)
        type: DataTypes.STRING,
        allowNull: true,
      },
      format: { // 🏠 Формат (онлайн / оффлайн)
        type: DataTypes.STRING,
        allowNull: false,
      },
      language: { // 🌍 Язык события
        type: DataTypes.STRING,
        allowNull: true,
      },
      accessibility: { // ♿ Доступность для людей с ОВЗ
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      rating: { // ⭐ Средний рейтинг события
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
      },
      organizer: { // 🏢 Организатор события
        type: DataTypes.STRING,
        allowNull: true,
      },
      popularity: { // 🔥 Популярность (число посещений)
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Event',
      timestamps: true, // createdAt и updatedAt
    }
  );
  return Event;
};
