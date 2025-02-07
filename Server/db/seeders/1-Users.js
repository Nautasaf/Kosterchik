module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin299',
        email: 'a@mail.ru',
        password: 'a',
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'hashed_password',
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin2',
        email: 'admin2@example.com',
        password: 'hashed_password',
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin3',
        email: 'admin3@example.com',
        password: 'hashed_password',
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin4',
        email: 'admin4@example.com',
        password: 'hashed_password',
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin4232323',
        email: 'admin999@example.com',
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
