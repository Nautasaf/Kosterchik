module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert('UserFavorites', [
        {
          userId: 1,
          eventId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          eventId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          eventId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          eventId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          eventId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          eventId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          eventId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          eventId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          eventId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          eventId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          eventId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          eventId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          eventId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          eventId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          eventId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          eventId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          eventId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          eventId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          eventId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          eventId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
    },
  
    async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete('UserFavorites', null, {})
    },
  }