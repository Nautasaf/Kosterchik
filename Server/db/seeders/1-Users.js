const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = await bcrypt.hash('hash', 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'Санёчек',
        email: 'a@mail.ru',
        password: hashPassword,
        city: 'Москва',
        photoUrl: '/uploads/Sanek.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Сергей',
        email: 'admin@example.com',
        password: hashPassword,
        city: 'Москва',
        photoUrl: '/uploads/Salavat.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Ден',
        email: 'admin2@example.com',
        password: hashPassword,
        city: 'Москва',
        photoUrl: '/uploads/Den.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Даниииил',
        email: 'admin3@example.com',
        password: hashPassword,
        city: 'Москва',
        photoUrl: '/uploads/Danil.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Максон',
        email: 'admin4@example.com',
        password: hashPassword,
        city: 'Москва',
        photoUrl: '/uploads/Max.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Радомир',
        email: 'admin999@example.com',
        password: hashPassword,
        city: 'Москва',
        photoUrl: '/uploads/Danil.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
       
        username: 'Сергей',
        email: 'admin99999@example.com',
        password: hashPassword,
        city: 'Москва',
        photoUrl: '/uploads/Den.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
       
        username: 'Алекс',
        email: 'admin999999@example.com',
        password: hashPassword,
        city: 'Москва',
        photoUrl: '/uploads/Sanek.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
