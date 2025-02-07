'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Events', [
      // Событие 1
      {
        userId: 1,
        title: 'Тренинг по бизнес-стратегиям',
        description: 'Научитесь выстраивать успешные бизнес-стратегии.',
        city: 'Москва',
        start_date: new Date('2025-04-01T10:00:00Z'),
        end_date: new Date('2025-04-01T16:00:00Z'),
        price: 8000,
        event_type: 'тренинг',
        age_restriction: 18,
        duration: 360,
        district: 'Центр',
        format: 'офлайн',
        language: 'русский',
        accessibility: true,
        rating: 4.7,
        organizer: 'Business Academy',
        popularity: 90,
        imageUrl: 'https://example.com/training-image.jpg',
        background: 'https://example.com/training-background.jpg',
        requirements: 'Запись на тренинг',
        date: new Date('2025-02-15T19:00:00'),
        imageUrl: '1682774567890-abc123.jpg',
        maxPeople: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Событие 2
      {
        title: 'Лекция о развитии искусственного интеллекта',
        description: 'Обзор самых актуальных трендов и технологий в сфере AI.',
        city: 'Санкт-Петербург',
        date: new Date('2025-02-20T18:00:00'),
        userId: 1,
        imageUrl: '1682774567890-def456.jpg',
        maxPeople: 4,
        start_date: new Date('2025-04-05T18:00:00Z'),
        end_date: new Date('2025-04-05T20:00:00Z'),
        price: 1500,
        event_type: 'лекция',
        age_restriction: 16,
        duration: 120,
        district: 'Невский',
        format: 'офлайн',
        language: 'русский',
        accessibility: true,
        rating: 4.9,
        organizer: 'AI Research Center',
        popularity: 95,
        imageUrl: 'https://example.com/ai-lecture.jpg',
        background: 'https://example.com/ai-lecture-bg.jpg',
        requirements: 'Предварительная регистрация',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Событие 3
      {
        title: 'Фестиваль уличной еды',
        description: 'Тематическая встреча с уличной едой',
        city: 'Казань',
        date: new Date('2025-02-28T10:00:00'),
        userId: 1,
        imageUrl: '1682774567890-ghi789.jpg',
        maxPeople: 4,
        title: 'Вебинар по созданию мобильных приложений',
        description: 'Научитесь разрабатывать мобильные приложения для Android и iOS.',
        city: 'Онлайн',
        start_date: new Date('2025-04-10T12:00:00Z'),
        end_date: new Date('2025-04-10T15:00:00Z'),
        price: 3500,
        event_type: 'вебинар',
        age_restriction: 12,
        duration: 180,
        district: 'Онлайн',
        format: 'онлайн',
        language: 'русский',
        accessibility: true,
        rating: 4.8,
        organizer: 'Tech Academy',
        popularity: 100,
        imageUrl: 'https://example.com/webinar-app-dev.jpg',
        background: 'https://example.com/webinar-bg.jpg',
        requirements: 'Компьютер с интернетом',
        title: 'Фестиваль уличной еды',
        description: 'Тематическая встреча с уличной едой',
        city: 'Казань',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Событие 4
      {
        title: 'Концерт классической музыки',
        description: 'Концерт в филармонии города',
        city: 'Новосибирск',
        date: new Date('2025-03-01T20:00:00'),
        userId: 1,
        maxPeople: 4,
        title: 'Мастер-класс по фотографии',
        description: 'Изучите основы фотографии и различные техники съемки.',
        city: 'Казань',
        start_date: new Date('2025-04-15T09:00:00Z'),
        end_date: new Date('2025-04-15T14:00:00Z'),
        price: 4000,
        event_type: 'мастер-класс',
        age_restriction: 12,
        duration: 300,
        district: 'Кремлевская',
        format: 'офлайн',
        language: 'русский',
        accessibility: true,
        rating: 4.5,
        organizer: 'Photo School',
        popularity: 80,
        imageUrl: 'https://example.com/photography-class.jpg',
        background: 'https://example.com/photography-class-bg.jpg',
        requirements: 'Камера или смартфон с камерой',
        title: 'Концерт классической музыки',
        description: 'Концерт в филармонии города',
        city: 'Новосибирск',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Выставка современного искусства',
        description: 'Погрузитесь в мир современного искусства!',
        city: 'Санкт-Петербург',
        date: new Date('2025-03-10T19:30:00'),
        userId: 1,
        maxPeople: 7,
        start_date: new Date('2025-04-20T10:00:00Z'),
        end_date: new Date('2025-04-20T18:00:00Z'),
        price: 1000,
        event_type: 'выставка',
        age_restriction: 0,
        duration: 480,
        district: 'Невский',
        format: 'офлайн',
        language: 'русский',
        accessibility: true,
        rating: 4.6,
        organizer: 'Art Gallery',
        popularity: 75,
        imageUrl: 'https://example.com/exhibit-1.jpg',
        background: 'https://example.com/exhibit-bg-1.jpg',
        requirements: 'Билет на вход',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Выставка современного искусства',
        description: 'Погрузитесь в мир современного искусства!',
        city: 'Санкт-Петербург',
        start_date: new Date('2025-04-20T10:00:00Z'),
        end_date: new Date('2025-04-20T18:00:00Z'),
        maxPeople: 7,
        price: 1000,
        event_type: 'выставка',
        age_restriction: 0,
        duration: 480,
        district: 'Невский',
        format: 'офлайн',
        language: 'русский',
        accessibility: true,
        rating: 4.6,
        organizer: 'Art Gallery',
        popularity: 75,
        userId: 4,
        imageUrl: 'https://example.com/exhibit-1.jpg',
        background: 'https://example.com/exhibit-bg-1.jpg',
        requirements: 'Билет на вход',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Выставка современного искусства',
        description: 'Погрузитесь в мир современного искусства!',
        city: 'Санкт-Петербург',
        start_date: new Date('2025-04-20T10:00:00Z'),
        end_date: new Date('2025-04-20T18:00:00Z'),
        price: 1000,
        event_type: 'выставка',
        age_restriction: 0,
        duration: 480,
        district: 'Невский',
        format: 'офлайн',
        language: 'русский',
        accessibility: true,
        rating: 4.6,
        organizer: 'Art Gallery',
        popularity: 75,
        userId: 5,
        maxPeople: 7,
        imageUrl: 'https://example.com/exhibit-1.jpg',
        background: 'https://example.com/exhibit-bg-1.jpg',
        requirements: 'Билет на вход',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Выставка современного искусства',
        description: 'Погрузитесь в мир современного искусства!',
        city: 'Санкт-Петербург',
        start_date: new Date('2025-04-20T10:00:00Z'),
        end_date: new Date('2025-04-20T18:00:00Z'),
        price: 1000,
        event_type: 'выставка',
        age_restriction: 0,
        duration: 480,
        district: 'Невский',
        format: 'офлайн',
        language: 'русский',
        accessibility: true,
        rating: 4.6,
        organizer: 'Art Gallery',
        popularity: 75,
        userId: 5,
        maxPeople: 7,
        imageUrl: 'https://example.com/exhibit-1.jpg',
        background: 'https://example.com/exhibit-bg-1.jpg',
        requirements: 'Билет на вход',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Выставка современного искусства',
        description: 'Погрузитесь в мир современного искусства!',
        city:'Санкт-Петербург',
        start_date: new Date('2025-04-20T10:00:00Z'),
        end_date: new Date('2025-04-20T18:00:00Z'),
        price: 1000,
        event_type: 'выставка',
        age_restriction: 0,
        duration: 480,
        district: 'Невский',
        format: 'офлайн',
        language: 'русский',
        accessibility: true,
        rating: 4.6,
        organizer: 'Art Gallery',
        popularity: 75,
        userId: 4,
        imageUrl: 'https://example.com/exhibit-1.jpg',
        background: 'https://example.com/exhibit-bg-1.jpg',
        requirements: 'Билет на вход',
        title: 'Фестиваль технологий',
        description: 'Самые инновационные проекты',
        city: 'Казань',
        date: new Date('2025-04-20T10:00:00'),
        imageUrl: '1682774567890-yza567.jpg',
        maxPeople: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Воркшоп по йоге',
        description: 'Мастер-класс по йоге и медитации',
        city: 'Петербург',
        date: new Date('2025-05-01T08:00:00'),
        userId: 1,
        maxPeople: 4,
        title: 'Выставка современного искусства',
        description: 'Погрузитесь в мир современного искусства!',
        city: 'Санкт-Петербург',
        start_date: new Date('2025-04-20T10:00:00Z'),
        end_date: new Date('2025-04-20T18:00:00Z'),
        price: 1000,
        event_type: 'выставка',
        age_restriction: 0,
        duration: 480,
        district: 'Невский',
        format: 'офлайн',
        language: 'русский',
        accessibility: true,
        rating: 4.6,
        organizer: 'Art Gallery',
        popularity: 75,
        imageUrl: 'https://example.com/exhibit-1.jpg',
        background: 'https://example.com/exhibit-bg-1.jpg',
        requirements: 'Билет на вход',
        title: 'Воркшоп по йоге',
        description: 'Мастер-класс по йоге и медитации',
        city: 'Петербург',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Events', null, {});
  },
};