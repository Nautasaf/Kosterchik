import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from './HeadPage.module.scss'; 
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "../store/thunk/SearchThunk"; 
import { RootState, AppDispatch } from "../store/Index"; 
import { Search } from "./Search";

export const HeadPage = () => {

  const dispatch = useDispatch<AppDispatch>(); 

  const { events, loading, error, filters } = useSelector(
    (state: RootState) => state.search  
  );
  const { isLoggedIn } = useSelector((state: RootState) => state.Auth); 
 
 
  useEffect(() => {
    dispatch(fetchSearch(filters));
  }, [dispatch, filters]);

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
      {isLoggedIn &&  <Search/>
      
      
    }
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
          </NavLink>
        ))}
      </div>
    </div>
  );
};