module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 6,
        username: 'admin',
        email: 'admin@example.com',
        password: 'hashed_password',
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        username: 'admin2',
        email: 'admin2@example.com',
        password: 'hashed_password',
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        username: 'admin3',
        email: 'admin3@example.com',
        password: 'hashed_password',
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        username: 'admin4',
        email: 'admin4@example.com',
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
