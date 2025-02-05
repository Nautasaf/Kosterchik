import { useState, useCallback, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./HeadPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "../store/thunk/SearchThunk";
import { RootState, AppDispatch } from "../store/Index";
import { Search } from "./Search";
import { useDebounce } from "../hooks/useDebounce";
import { Sidebar } from "./SideBar";
import React from "react";
import moment from "moment";
import "moment/locale/ru";
moment.updateLocale("ru", {
  months: [
    "Января", "Февраля", "Марта", "Апреля", "Маия", "Июня",
    "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
  ],
  monthsShort: [
    "янв", "фев", "мар", "апр", "май", "июн",
    "июл", "авг", "сен", "окт", "ноя", "дек"
  ]
});

export const HeadPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.Auth);
  const { events, loading, error, filters } = useSelector(
    (state: RootState) => state.search
  );


  const debouncedFilters = useDebounce(filters, 1000);


  const handleFilterChange = (newFilters) => {  
    dispatch({ type: "search/updateFilters", payload: newFilters });  
  };


  const handleFetch = useCallback(() => {
    dispatch(fetchSearch(debouncedFilters));
  }, [debouncedFilters, dispatch]);


  useEffect(() => {
    if (debouncedFilters.city || debouncedFilters.date || debouncedFilters.title) {
      handleFetch();
    } else {
      dispatch(fetchSearch({ city: "", date: "", title: "" }));
    }
  }, [debouncedFilters, dispatch, handleFetch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!isLoggedIn) {
    return <div className={styles.authMessage}>Пожалуйста, авторизуйтесь для просмотра событий.</div>;
  }

  if (error) {
    return <div>Произошла ошибка: {error}</div>;
  }

  if (events.length === 0) {
    return <div>Нет доступных событий</div>;
  }

  return (
    <div className={styles.headPageContainer}>
      {/* {isLoggedIn && <Search />} */}
      {/* {isLoggedIn && <Sidebar onFilterChange={handleFilterChange} />} */}
      <h1 className={styles.pageTitle}>Список событий</h1>
      <div className={styles.eventList}>
        {events.map((event) => (
          <NavLink
            to={`/event/${event.id}`}
            key={event.id}
            className={styles.eventItem}
          >
            <h2 className={styles.eventTitle}>{event.title}</h2>
            {/* <img
              src={event.imageUrl}
              alt={event.title}
              className={styles.eventImage}
            /> */}
            <p className={styles.eventInfo}>{event.description}</p>
            {event.maxPeople ? 
              (
                <p className={styles.eventInfo}>Количество участников: {event.people}/{event.maxPeople}</p>
              ) : (
                <p className={styles.eventInfo}>Количество участников: {event.people}</p>
              )}
            <p className={styles.eventCity}>Город: {event.city}</p>
            <p className={styles.eventCity}>Место: {event.district}</p>
            <div className={styles.eventDate}>
              Начало: {moment(event.start_date).format("D MMMM YYYY, HH:mm")} 
              {event.end_date ? ` до ${moment(event.end_date).format("HH:mm")}` : ""}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};