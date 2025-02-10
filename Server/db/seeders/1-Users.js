const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = await bcrypt.hash('hash', 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin299',
        email: 'a@mail.ru',
        password: hashPassword,
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin',
        email: 'admin@example.com',
        password: hashPassword,
        city: 'Москва',
        photoUrl: 'https://i.pinimg.com/originals/69/4d/f5/694df546540be1559bd06dbb83ce21fe.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin2',
        email: 'admin2@example.com',
        password: hashPassword,
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin3',
        email: 'admin3@example.com',
        password: hashPassword,
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin4',
        email: 'admin4@example.com',
        password: hashPassword,
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin4232323',
        email: 'admin999@example.com',
        password: hashPassword,
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
       
        username: 'admin423332323',
        email: 'admin99999@example.com',
        password: hashPassword,
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
       
        username: 'admin423322232323',
        email: 'admin999999@example.com',
        password: hashPassword,
        city: 'Москва',
        photoUrl: 'https://example.com/photo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
