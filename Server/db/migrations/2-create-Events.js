'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      start_date: { // 🗓 Дата начала события
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_date: { // 🗓 Дата окончания события (может быть null)
        type: Sequelize.DATE,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      background: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      requirements: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      maxPeople: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      price: { // 💰 Цена билета (null = бесплатно)
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      event_type: { // 🎭 Тип события (концерт, выставка, конференция и т.д.)
        type: Sequelize.STRING,
        allowNull: true,
      },
      age_restriction: { // 🔞 Возрастное ограничение (0+, 6+, 12+, 18+)
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      duration: { // ⏳ Длительность в минутах
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      district: { // 📍 Район города (для крупных городов)
        type: Sequelize.STRING,
        allowNull: true,
      },
      format: { // 🏠 Формат (онлайн / оффлайн)
        type: Sequelize.STRING,
        allowNull: true,
      },
      language: { // 🌍 Язык события
        type: Sequelize.STRING,
        allowNull: true,
      },
      accessibility: { // ♿ Доступность для людей с ОВЗ
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      rating: { // ⭐ Средний рейтинг события
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
      },
      organizer: { // 🏢 Организатор события
        type: Sequelize.STRING,
        allowNull: true,
      },
      popularity: { // 🔥 Популярность (число посещений)
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  },
};
