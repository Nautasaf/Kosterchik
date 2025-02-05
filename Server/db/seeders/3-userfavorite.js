module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [
        {
          id: 1,
          
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
    },
  
    async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Events', null, {})
    },
  }