'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Изменяем столбцы latitude и longitude: убираем defaultValue (предполагается, что эти столбцы уже существуют)
    await queryInterface.changeColumn('Events', 'latitude', {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
    await queryInterface.changeColumn('Events', 'longitude', {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
    // Добавляем столбец markerIcon, если его ещё нет.
    // Оборачиваем в try-catch, чтобы если столбец уже существует – миграция не падала.
    try {
      await queryInterface.addColumn('Events', 'markerIcon', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    } catch (error) {
      // Код ошибки 42701 означает, что колонка уже существует
      if (error.parent && error.parent.code === '42701') {
        console.warn('Column "markerIcon" already exists. Skipping addColumn.');
      } else {
        throw error;
      }
    }
  },

  async down(queryInterface, Sequelize) {
    // При откате удаляем столбец markerIcon, если он существует
    try {
      await queryInterface.removeColumn('Events', 'markerIcon');
    } catch (error) {
      // Если столбца нет, пропускаем
      if (error.parent && error.parent.code === '42703') {
        console.warn('Column "markerIcon" does not exist during down migration.');
      } else {
        throw error;
      }
    }
    // При откате можно вернуть defaultValue для координат, если требуется
    await queryInterface.changeColumn('Events', 'latitude', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 55.751244,
    });
    await queryInterface.changeColumn('Events', 'longitude', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 37.618423,
    });
  }
};