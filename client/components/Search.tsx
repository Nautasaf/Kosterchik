
import styles from './Search.module.scss';
import { setCity, setDate, setTitle} from '../store/slice/SearchSlice';
import { useDispatch, useSelector } from 'react-redux';
import {  AppDispatch, RootState } from '../store/Index';
import { fetchSearch} from '../store/thunk/SearchThunk'

export const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { city, date, title } = useSelector((state: RootState) => state.search.filters)


  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCity(event.target.value)); 
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDate(event.target.value));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(event.target.value)); 
  };
  const handleSearch = () => {
    dispatch(fetchSearch({
      city,
      date,
      title
    }));
    
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

<input
        type="text"
        value={title}
         placeholder="Введите событие"
        onChange={handleTitleChange}
        className={styles.searchInput}
      />
      
      <button onClick={handleSearch} className={styles.searchButton}>
        Найти
      </button>
    </div>
  );
};




