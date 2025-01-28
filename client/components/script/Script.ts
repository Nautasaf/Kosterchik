// Функция для создания снежинки
export const createSnowflake = () => {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.style.left = `${Math.random() * 100}%`; // случайное положение по оси X
  snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`; // случайная продолжительность анимации
  snowflake.style.animationDelay = `${Math.random() * 5}s`; // случайная задержка

  document.body.appendChild(snowflake);

  // Удаление снежинки по завершению анимации
  snowflake.addEventListener('animationend', () => {
    snowflake.remove();
  });
};

// Функция для старта снегопада
export const startSnowfall = () => {
  if (!window.snowfallInterval) {
    window.snowfallInterval = setInterval(createSnowflake, 100); // создаем снежинки каждые 100ms
  }
};

// Функция для остановки снегопада
export const stopSnowfall = () => {
  clearInterval(window.snowfallInterval);
  window.snowfallInterval = null; // сбрасываем переменную
};

// Функция для создания капли дождя
export const createRaindrop = () => {
  const raindrop = document.createElement('div');
  raindrop.classList.add('raindrop');
  raindrop.style.left = `${Math.random() * 100}%`; // случайное положение по оси X
  raindrop.style.animationDuration = `${Math.random() * 2 + 2}s`; // случайная продолжительность анимации

  document.body.appendChild(raindrop);

  // Удаление капли дождя по завершению анимации
  raindrop.addEventListener('animationend', () => {
    raindrop.remove();
  });
};

// Функция для старта дождя
export const startRainfall = () => {
  if (!window.rainfallInterval) {
    window.rainfallInterval = setInterval(createRaindrop, 100); // создаем капли дождя каждые 100ms
  }
};

// Функция для остановки дождя
export const stopRainfall = () => {
  clearInterval(window.rainfallInterval);
  window.rainfallInterval = null; // сбрасываем переменную
};