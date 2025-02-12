import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./EventItem.module.scss";
import { RootState, AppDispatch } from "../store/Index";
import { fetchUsers } from "../store/thunk/AllUserThunk";
import { fetchEvents } from "../store/thunk/EventThunk";
import { addToFavorites, getAllFavorites } from "../store/thunk/FavoriteThunk";
import moment from "moment";
import "moment/locale/ru";
import { isBgColor } from "../src/utils/background";
import { Favorite } from "../interface/EventFetch";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import SubscriptionMap from "./SubscriptionMaps/SubscriptionMaps";
// import TawkToChat from "./TawkToChat";

moment.locale("ru");

const apiUrl = import.meta.env.VITE_API_URL;

export const EventItem: React.FC = () => {
  // Извлекаем id события из URL-параметров
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // Локальное состояние для данных организатора и виджета чата
  const [organizer, setOrganizer] = useState<any>(null);
  const [chatVisible, setChatVisible] = useState(false);
  // Если нужен функционал отображения маршрута, можно добавить:
  // const [routeVisible, setRouteVisible] = useState(false);

  // Получаем события из Redux
  const { events, loading: eventsLoading } = useSelector(
    (state: RootState) => state.Events
  );
  // Получаем список избранных (для проверки участия)
  const allFavorites = useSelector(
    (state: RootState) => state.Favorites.favorites
  );

  // Функция для получения количества участников по событию
  const handleGetFavorites = (eventId: number): number => {
    const copyFav = JSON.parse(JSON.stringify(allFavorites));
    return copyFav.filter((fav: Favorite) => fav.eventId === eventId).length;
  };

  // Функция для проверки, участвует ли текущий пользователь в событии
  const handleUserAlreadyAddedToFavorites = (
    eventId: number,
    userId: number
  ): boolean => {
    return allFavorites.some(
      (fav) => fav.eventId === eventId && fav.userId === userId
    );
  };

  useEffect(() => {
    dispatch(getAllFavorites());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Находим событие по id (данные приходят из Redux)
  const event = events.find((e) => e.id.toString() === id);

  useEffect(() => {
    if (event) {
      // Получаем данные организатора по userId события
      dispatch(fetchUsers(event.userId)).then((res) => {
        setOrganizer(res.payload);
      });
    }
  }, [dispatch, event]);

  // Получаем данные текущего пользователя из localStorage
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = userData.id;

  // Обработчик для добавления/отмены участия (избранное)
  const handleAddToFavorites = () => {
    if (event) {
      dispatch(addToFavorites({ eventId: event.id, userId }));
    }
  };

  // Обработчик для отображения виджета чата Tawk.to
  const handleAskQuestion = () => {
    setChatVisible(true);
    if ((window as any).Tawk_API && (window as any).Tawk_API.showWidget) {
      (window as any).Tawk_API.showWidget();
    } else {
      console.error("Tawk.to API не загружен");
    }
  };

  if (eventsLoading) {
    return <div>Загрузка данных...</div>;
  }

  if (!event) {
    return <div>Событие не найдено</div>;
  }

  // Если координаты события заданы, используем их; иначе они могут быть дефолтными на стороне сервера
  const eventCoordinates =
    event.latitude && event.longitude
      ? ([event.latitude, event.longitude] as [number, number])
      : null;

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
              {handleUserAlreadyAddedToFavorites(event.id, userId) ? (
                <div className={styles.eventCity}>
                  Вы уже участвуете в этом мероприятии
                </div>
              ) : handleGetFavorites(event.id) === event.maxPeople ? (
                <div className={styles.eventCity}>
                  В этом мероприятии уже максимальное количество участников
                </div>
              ) : (
                <div className={styles.eventCity}>
                  Вы можете присоединиться к этому мероприятию
                </div>
              )}
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

          {eventCoordinates && (
            <div className={styles.mapContainer}>
              <YMaps
                query={{
                  apikey: "34b7dcda-c8dc-4636-8fbc-7924193d0673",
                  lang: "ru_RU",
                }}>
                <Map
                  state={{ center: eventCoordinates, zoom: 10 }}
                  width="100%"
                  height="300px">
                  <Placemark geometry={eventCoordinates} />
                </Map>
              </YMaps>
            </div>
          )}

          <div className={styles.eventButtonContainer}>
            <button className={styles.eventButton} onClick={handleAskQuestion}>
              Задать вопрос
            </button>

            {handleUserAlreadyAddedToFavorites(event.id, userId) ? (
              <button
                className={styles.eventButton}
                onClick={handleAddToFavorites}>
                Отказаться
              </button>
            ) : handleGetFavorites(event.id) === event.maxPeople ? (
              <button className={styles.eventButton}>Нет мест</button>
            ) : (
              <button
                className={styles.eventButton}
                onClick={handleAddToFavorites}>
                Я готов
              </button>
            )}

            <button
              className={styles.eventButton}
              onClick={() => console.log("Участники")}>
              Участники
            </button>
          </div>
        </div>
      </div>

      {/* {chatVisible && <TawkToChat />} */}
      {/* Если нужен компонент маршрута, его можно добавить аналогично */}
      {/* {routeVisible && eventCoordinates && (
          <SubscriptionMap
            eventCoordinates={eventCoordinates}
            onClose={() => setRouteVisible(false)}
          />
      )} */}
    </div>
  );
};

export default EventItem;
