import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/Index';
import { updateFilters } from '../store/slice/SearchSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Sidebar.module.scss';
import { parse, format } from 'date-fns';

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.search.filters);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFilters({ [event.target.name]: event.target.value }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFilters({ [event.target.name]: event.target.checked }));
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateFilters({ [event.target.name]: event.target.value }));
  };
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd'); 
      dispatch(updateFilters({ date: formattedDate }));
    } else {
      dispatch(updateFilters({ date: null }));
    }
  };
  const parsedDate = filters.date ? parse(filters.date, 'yyyy-MM-dd', new Date()) : null;

  const resetFilters = () => {
    dispatch(updateFilters({
      title: '',
      city: '',
      date: undefined,
      price: '',
      event_type: '',
      age_restriction: '',
      duration: '',
      district: '',
      format: '',
      available_seats: '',
      language: '',
      accessibility: false,
      rating: '',
      organizer: '',
      popularity: ''
    }));
  };

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.header}>Фильтр событий</h3>

      <label>
        Название события:
        <input type="text" name="title" value={filters.title} onChange={handleInputChange} />
      </label>

      <label>
        Город:
        <input type="text" name="city" value={filters.city} onChange={handleInputChange} />
      </label>

      <div className={styles.labelWrapper}>
  <span>Дата:</span>
  <DatePicker
    selected={parsedDate || null}
    onChange={handleDateChange}
    dateFormat="dd-MM-yyyy"
    placeholderText="Выберите день и месяц"
    className={styles.searchInput}
  />
</div>
      <label>
        Тип события:
        <input type="text" name="event_type" value={filters.event_type} onChange={handleInputChange} />
      </label>

      <label>
  Цена до: {filters.price || 0} ₽
  <input 
    type="range" 
    name="price" 
    min="0" 
    max="10000" 
    step="100"
    value={filters.price || 0} 
    onChange={handleInputChange} 
  />
</label>

      <label>
  Возрастное ограничение от: <strong>{filters.age_restriction || "Все"}</strong>
  <input
    type="range"
    name="age_restriction"
    min="0"
    max="18"
    step="1"
    value={filters.age_restriction || 0}
    onChange={handleInputChange}
  />
</label>
<label>
  Длительность от (минуты): {filters.duration || 0}
  <input
    type="range"
    name="duration"
    min="0"
    max="300"
    step="10"
    value={filters.duration || 0}
    onChange={handleInputChange}
  />
</label>
<label>
  Рейтинг (от): {filters.rating || 0}
  <input
    type="range"
    name="rating"
    min="0"
    max="5"
    step="0.1"
    value={filters.rating || 0}
    onChange={handleInputChange}
  />
</label>
      <label>
        Район:
        <input type="text" name="district" value={filters.district} onChange={handleInputChange} />
      </label>

      <label>
        Формат:
        <input type="text" name="format" value={filters.format} onChange={handleInputChange} />
      </label>

      <label>
        Доступные места:
        <input type="number" name="available_seats" value={filters.available_seats} onChange={handleInputChange} />
      </label>
      {/* ToDo: value={event.maxPeople - handleGetFavorites} */}

      <label>
  Язык:
  <select name="language" value={filters.language} onChange={handleSelectChange}>
    <option value="">Любой</option>
    <option value="Русский">Русский</option>
    <option value="Английский">Английский</option>
    <option value="Немецкий">Немецкий</option>
    <option value="Французский">Французский</option>
    <option value="Испанский">Испанский</option>
    <option value="Китайский">Китайский</option>
  </select>
</label>
      <label>
        Доступность для маломобильных:
        <input type="checkbox" name="accessibility" checked={filters.accessibility} onChange={handleCheckboxChange} />
      </label>

    

      <label>
        Организатор:
        <input type="text" name="organizer" value={filters.organizer} onChange={handleInputChange} />
      </label>

      <label>
  Посещаемость (от): {filters.popularity || 0}
  <input
    type="range"
    name="popularity"
    min="0"
    max="500"
    step="10"
    value={filters.popularity || 0}
    onChange={handleInputChange}
  />
</label>
      <div className={styles.buttonGroup}>
        <button className={styles.resetButton} onClick={resetFilters}>
          Очистить фильтры
        </button>
      </div>

    
    </div>
  );
};