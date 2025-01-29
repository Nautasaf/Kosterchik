import React, { useState } from 'react';
import styles from './Search.module.scss';

export const Search: React.FC = () => {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Введите город"
        value={city}
        onChange={handleCityChange }
        className={styles.searchInput}
      />
      
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className={styles.searchInput}
      />
      
      <button onClick={() => console.log(`Город: ${city}, Дата: ${date}`)} className={styles.searchButton}>
        Найти
      </button>
    </div>
  );
};