module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        password: 'hashed_password',
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {})
  },
}
