import styles from "./Sidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Index";

export const Sidebar = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.search.events);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    };

    dispatch({ type: "search/updateFilters", payload: updatedFilters }); 
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const initialFilters = {
      date: "",
      eventType: "",
      price: "",
      ageRestriction: "",
      duration: "",
      district: "",
      format: "",
      upcomingDays: "",
      language: "",
      availableSeats: "",
      accessibility: false,
      rating: "",
      organizer: "",
      popularity: "",
    };

    dispatch({ type: "search/updateFilters", payload: initialFilters }); 
    onFilterChange(initialFilters);
  };

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.header}>Фильтры</h3>

      <label>Дата события:</label>
      <input type="date" name="date" value={filters} onChange={handleChange} />

      <label>Тип события:</label>
      <select name="eventType" value={filters.eventType} onChange={handleChange}>
        <option value="">Любой</option>
        <option value="концерт">Концерт</option>
        <option value="выставка">Выставка</option>
        <option value="конференция">Конференция</option>
        <option value="тренинг">Тренинг</option>
      </select>

      <label>Цена билета:</label>
      <input type="number" name="price" placeholder="До какой суммы?" value={filters.price} onChange={handleChange} />

      <label>Возрастное ограничение:</label>
      <select name="ageRestriction" value={filters.ageRestriction} onChange={handleChange}>
        <option value="">Все</option>
        <option value="0">0+</option>
        <option value="6">6+</option>
        <option value="12">12+</option>
        <option value="18">18+</option>
      </select>

      <label>Длительность (в минутах):</label>
      <input type="number" name="duration" placeholder="Продолжительность" value={filters.duration} onChange={handleChange} />

      <label>Район города:</label>
      <input type="text" name="district" placeholder="Введите район" value={filters.district} onChange={handleChange} />

      <label>Формат:</label>
      <select name="format" value={filters.format} onChange={handleChange}>
        <option value="">Любой</option>
        <option value="онлайн">Онлайн</option>
        <option value="офлайн">Офлайн</option>
      </select>

      <label>Ближайшие дни:</label>
      <input type="number" name="upcomingDays" placeholder="Например, 7" value={filters.upcomingDays} onChange={handleChange} />

      <label>Язык:</label>
      <select name="language" value={filters.language} onChange={handleChange}>
        <option value="">Любой</option>
        <option value="русский">Русский</option>
        <option value="английский">Английский</option>
      </select>

      <label>Осталось мест не менее:</label>
      <input type="number" name="availableSeats" placeholder="Минимум мест" value={filters.availableSeats} onChange={handleChange} />

      <label>Доступ для инвалидов:</label>
      <input type="checkbox" name="accessibility" checked={filters.accessibility} onChange={handleChange} />

      <label>Рейтинг (от 1 до 5):</label>
      <input type="number" name="rating" placeholder="Минимальный рейтинг" min="1" max="5" value={filters.rating} onChange={handleChange} />

      <label>Организатор:</label>
      <input type="text" name="organizer" placeholder="Название компании" value={filters.organizer} onChange={handleChange} />

      <label>Популярность:</label>
      <select name="popularity" value={filters.popularity} onChange={handleChange}>
        <option value="">Любая</option>
        <option value="топ">Топовые</option>
        <option value="новые">Новые</option>
      </select>

      <button className={styles.resetButton} onClick={resetFilters}>Сбросить фильтры</button>
    </aside>
  );
};