module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        password: 'hashed_password',
        city: 'Москва',
        photoUrl: 'https://i.pinimg.com/originals/69/4d/f5/694df546540be1559bd06dbb83ce21fe.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {})
  },
}
