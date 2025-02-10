import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import moment from "moment";
import "moment/locale/ru";
import styles from "./EventItem.module.scss";
import { RootState, AppDispatch } from "../store/Index";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/thunk/AllUserThunk";
import { fetchEvents } from "../store/thunk/EventThunk";
import { addToFavorites, getAllFavorites } from "../store/thunk/FavoriteThunk";
import { isBgColor } from "../src/utils/background";
import SubscriptionMap from "./SubscriptionMaps/SubscriptionMaps";

const apiUrl = import.meta.env.VITE_API_URL;

const EventItem: React.FC = () => {
  // Извлекаем id события из параметров маршрута
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // Состояния для организатора и отображения маршрута
  const [organizer, setOrganizer] = useState<any>(null);
  const [showRoute, setShowRoute] = useState(false);

  // Получаем события из Redux
  const { events, loading: eventsLoading } = useSelector(
    (state: RootState) => state.Events
  );

  // Избранное: получаем список и считаем количество участников
  const allFavorites = useSelector(
    (state: RootState) => state.Favorites.favorites
  );
  const handleGetFavorites = (eventId: number): number => {
    const copyFav = JSON.parse(JSON.stringify(allFavorites));
    return copyFav.filter((fav: any) => fav.eventId === eventId).length;
  };

  // Загружаем избранное и события при инициализации компонента
  useEffect(() => {
    dispatch(getAllFavorites());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Ищем событие по id
  const event = events.find((e) => e.id.toString() === id);

  // Если событие найдено, загружаем данные организатора
  useEffect(() => {
    if (event) {
      dispatch(fetchUsers(event.userId)).then((res) => {
        setOrganizer(res.payload);
      });
    }
  }, [dispatch, event]);

  // Получаем данные текущего пользователя из localStorage
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = userData.id;

  // Обработчик для добавления события в избранное
  const handleAddToFavorites = () => {
    if (event) {
      dispatch(addToFavorites({ eventId: event.id, userId }));
      setShowRoute(true);
    }
  };

  if (eventsLoading) {
    return <div>Загрузка данных...</div>;
  }

  if (!event) {
    return <div>Событие не найдено</div>;
  }

  // Вычисляем координаты события (если заданы)
  const eventCoordinates =
    event.latitude && event.longitude
      ? ([event.latitude, event.longitude] as [number, number])
      : null;

  // Для отладки можно вывести в консоль координаты
  console.log("Event coordinates:", eventCoordinates);

  return (
    <div className={styles.eventItem}>
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
      <div className={styles.eventColumns}>
        <div className={styles.eventColumn}>
          <div className={styles.containerProfile}>
            <h2>Профиль организатора</h2>
            {organizer && (
              <img
                className={styles.profilePhoto}
                src={
                  organizer.photoUrl
                    ? `${apiUrl}${organizer.photoUrl}`
                    : "/default-background.jpg"
                }
                alt="avatar"
              />
            )}
            <div className={styles.profileInfo}>
              <p>Имя: {organizer?.username}</p>
              <p>Email: {organizer?.email}</p>
              <p>Город: {organizer?.city}</p>
            </div>
          </div>
        </div>
        <div className={styles.eventColumn}>
          <div className={styles.eventDescription}>{event.description}</div>
          <div className={styles.eventCity}>Город: {event.city}</div>
          <div className={styles.eventCity}>Место: {event.district}</div>
          {event.maxPeople ? (
            <>
              <div className={styles.eventCity}>
                Количество участников: {handleGetFavorites(event.id)}/
                {event.maxPeople}
              </div>
              <button
                className={styles.eventButton}
                onClick={handleAddToFavorites}>
                Я готов
              </button>
            </>
          ) : (
            <div className={styles.eventCity}>
              Количество участников: {handleGetFavorites(event.id)}
            </div>
          )}
          <div className={styles.eventDate}>
            Начало: {moment(event.start_date).format("D MMMM YYYY, HH:mm")}
            {event.end_date
              ? ` до ${moment(event.end_date).format("HH:mm")}`
              : ""}
          </div>
        </div>
      </div>
      // EventItem.tsx
      {eventCoordinates && (
        <div className={styles.mapContainer}>
          <YMaps query={{ apikey: "34b7dcda-c8dc-4636-8fbc-7924193d0673" }}>
            <Map
              state={{ center: eventCoordinates, zoom: 13 }}
              width="100%"
              height="300px">
              <Placemark
                geometry={eventCoordinates}
                options={{ preset: "islands#darkblueCircleIcon" }}
              />
            </Map>
          </YMaps>
        </div>
      )}
      {showRoute && eventCoordinates && (
        <SubscriptionMap
          eventCoordinates={eventCoordinates}
          onClose={() => setShowRoute(false)}
        />
      )}
    </div>
  );
};

export default EventItem;
