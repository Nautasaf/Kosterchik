import React, { useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import styles from "./HeadPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../store/thunk/EventThunk";
import { RootState, AppDispatch } from "../store/Index";
import moment from "moment";
import "moment/locale/ru";
import { Sidebar } from "./SideBar";
import { getAllFavorites } from "../store/thunk/FavoriteThunk";
import { isBgColor } from "../src/utils/background";

const apiUrl = import.meta.env.VITE_API_URL;

moment.updateLocale("ru", {
  months: [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ],
  monthsShort: [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ],
});

export const HeadPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Получаем события, состояние загрузки и ошибки из Redux-слайса для событий
  const { events, loading, error } = useSelector(
    (state: RootState) => state.Events
  );

  // Получаем фильтры из слайса поиска
  const filters = useSelector((state: RootState) => state.search.filters);

  // Получаем информацию об авторизации
  const { isLoggedIn } = useSelector((state: RootState) => state.Auth);

  // При загрузке компонента загружаем события
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Получаем список избранных событий из Redux
  const allFavorites = useSelector(
    (state: RootState) => state.Favorites.favorites
  );

  // Получаем данные текущего пользователя (из localStorage)
  const userData = JSON.parse(localStorage.getItem("userss") || "{}");
  const userId = userData.id;

  // Функция для подсчёта количества избранных заявок для события
  const handleGetFavorites = (eventId: number): number => {
    // Клонируем объект избранных, чтобы не мутировать состояние
    const copyFav = JSON.parse(JSON.stringify(allFavorites));
    const favCounter = copyFav.filter(
      (fav: any) => fav.eventId === eventId
    ).length;
    return favCounter;
  };

  // Функция для проверки, добавил ли пользователь событие в избранное
  const handleUserAlreadyAddedToFavorites = (
    eventId: number,
    userId: number
  ): boolean => {
    return allFavorites.some(
      (fav: any) => fav.eventId === eventId && fav.userId === userId
    );
  };

  // Получаем все избранные события (при изменении диспатча)
  useEffect(() => {
    dispatch(getAllFavorites());
  }, [dispatch]);

  // Повторно загружаем события при изменении (это может быть избыточно, если fetchEvents уже вызывается ранее)
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Фильтруем события на основе установленных фильтров
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesTitle = filters.title
        ? event.title.toLowerCase().includes(filters.title.toLowerCase())
        : true;
      const matchesCity = filters.city
        ? event.city.toLowerCase().includes(filters.city.toLowerCase())
        : true;
      const matchesDate = filters.date
        ? event.start_date.startsWith(filters.date)
        : true;
      const matchesPrice =
        !filters.price || Number(filters.price) === 0
          ? true
          : (event.price ?? 0) <= Number(filters.price);
      const matchesType = filters.event_type
        ? (event.event_type ?? "")
            .toLowerCase()
            .includes(filters.event_type.toLowerCase())
        : true;
      const matchesAge = filters.age_restriction
        ? (event.age_restriction ?? 0) >= Number(filters.age_restriction)
        : true;
      const matchesDuration = filters.duration
        ? (event.duration ?? 0) >= Number(filters.duration)
        : true;
      const matchesDistrict = filters.district
        ? event.district
            ?.toLowerCase()
            .includes(filters.district.toLowerCase()) || false
        : true;
      const matchesFormat = filters.format
        ? (event.format ?? "")
            .toLowerCase()
            .includes(filters.format.toLowerCase())
        : true;
      const matchesSeats = filters.available_seats
        ? (event.available_seats ?? 0) >= Number(filters.available_seats)
        : true;
      const matchesLanguage = filters.language
        ? (event.language ?? "").toLowerCase().trim() ===
          filters.language.toLowerCase().trim()
        : true;
      const matchesAccessibility = filters.accessibility
        ? event.accessibility === filters.accessibility
        : true;
      const matchesRating = filters.rating
        ? (event.rating ?? 0) >= Number(filters.rating)
        : true;
      const matchesOrganizer = filters.organizer
        ? event.organizer
            ?.toLowerCase()
            .includes(filters.organizer.toLowerCase()) || false
        : true;
      const matchesPopularity =
        !filters.popularity || Number(filters.popularity) === 0
          ? true
          : (event.popularity ?? 0) >= Number(filters.popularity);

      return (
        matchesTitle &&
        matchesCity &&
        matchesDate &&
        matchesPrice &&
        matchesType &&
        matchesAge &&
        matchesDuration &&
        matchesDistrict &&
        matchesFormat &&
        matchesSeats &&
        matchesLanguage &&
        matchesAccessibility &&
        matchesRating &&
        matchesOrganizer &&
        matchesPopularity
      );
    });
  }, [events, filters]);

  // Если пользователь не авторизован, показываем сообщение
  if (!isLoggedIn) {
    return (
      <div className={styles.authMessage}>
        Пожалуйста, авторизуйтесь для просмотра событий.
      </div>
    );
  }

  // Если идёт загрузка, показываем спиннер или сообщение о загрузке
  if (loading) return <div>Загрузка...</div>;

  // Если произошла ошибка, выводим сообщение об ошибке
  if (error) return <div>Произошла ошибка: {error}</div>;

  return (
    <div className={styles.headPageContainer}>
      <Sidebar />
      <h1 className={styles.pageTitle}>Все события</h1>
      <div className={styles.eventList}>
        {filteredEvents.map((event) => (
          <NavLink
            to={`/event/${event.id}`}
            key={event.id}
            className={styles.eventItem}>
            <h2 className={styles.eventTitle}>{event.title}</h2>
            {isBgColor(event.background || "") ? (
              <div
                className={styles.eventImage}
                style={{ backgroundColor: event.background }}></div>
            ) : (
              <img
                className={styles.eventImage}
                src={
                  event.background
                    ? `${apiUrl}${event.background}`
                    : "/default-background.jpg"
                }
                alt={event.title}
              />
            )}
            <p className={styles.eventInfo}>{event.description}</p>
            {event.maxPeople ? (
              <p className={styles.eventInfo}>
                Количество участников: {handleGetFavorites(event.id)}/
                {event.maxPeople}
              </p>
            ) : (
              <p className={styles.eventInfo}>
                Количество участников: {handleGetFavorites(event.id)}
              </p>
            )}
            {handleUserAlreadyAddedToFavorites(event.id, userId) ? (
              <div className={styles.eventInfo}>
                Вы уже участвуете в этом мероприятии
              </div>
            ) : handleGetFavorites(event.id) === event.maxPeople ? (
              <div className={styles.eventInfo}>
                В этом мероприятии уже максимальное количество участвующих
              </div>
            ) : (
              <div className={styles.eventInfo}>
                Вы можете присоединиться к этому мероприятию
              </div>
            )}
            <p className={styles.eventCity}>Город: {event.city}</p>
            <p className={styles.eventCity}>Место: {event.district}</p>
            <div className={styles.eventDate}>
              Начало: {moment(event.start_date).format("D MMMM YYYY, HH:mm")}
              {event.end_date
                ? ` до ${moment(event.end_date).format("HH:mm")}`
                : ""}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default HeadPage;
