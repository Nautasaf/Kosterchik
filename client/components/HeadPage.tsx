import React from 'react';
import{ useState, useCallback, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from './HeadPage.module.scss'; 
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "../store/thunk/SearchThunk"; 
import { RootState, AppDispatch } from "../store/Index"; 
import moment from 'moment'; 
import 'moment/locale/ru'; 
moment.locale('ru');

export const HeadPage = () => {

  const dispatch = useDispatch<AppDispatch>(); 
  const { events, loading, error, filters } = useSelector((state: RootState) => state.search);
  const { isLoggedIn } = useSelector((state: RootState) => state.Auth); 
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const prevFilters = useRef(filters);

  const handleDebounce = useCallback(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      dispatch(fetchSearch(filters)); 
    }, 1500);

    setDebounceTimeout(timeout);
  }, [filters, debounceTimeout, dispatch]);

  useEffect(() => {
    if (filters !== prevFilters.current) {
      prevFilters.current = filters;
      handleDebounce(); 
    }
  }, [filters, handleDebounce]);


  useEffect(() => {
    if (!filters.city && !filters.date && !filters.title) {
      dispatch(fetchSearch({ city: '', date: '', title: '' }));
    }
  }, [filters, dispatch]); 

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!isLoggedIn) {
    return <div>Пожалуйста, авторизуйтесь для просмотра событий.</div>;
  }

  if (error) {
    return <div>Произошла ошибка: {error}</div>;
  }

  if (events.length === 0) {
    return <div>Нет доступных событий</div>;
  }

  return (
    <div className={styles.headPageContainer}>
      <h1 className={styles.pageTitle}>Список событий</h1>
      <div className={styles.eventList}>
        {events.map((event) => (
          <NavLink
            to={`/event/${event.id}`}
            key={event.id}
            className={styles.eventItem}
          >
            <h2 className={styles.eventTitle}>{event.title}</h2>
            <img
              src={event.imageUrl}
              alt={event.title}
              className={styles.eventImage}
            />
            <p className={styles.eventInfo}>{event.description}</p>
            <p className={styles.eventCity}>{event.city}</p>
            <p className={styles.eventDate}>{moment(event.date).format('D MMMM YYYY, HH:mm')}</p>
           
          </NavLink>
        ))}
      </div>
    </div>
    
  );
};