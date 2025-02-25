import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './EventItem.module.scss'
import { RootState, AppDispatch } from '../store/Index'
import { fetchUsers } from '../store/thunk/AllUserThunk'
import { fetchEvents } from '../store/thunk/EventThunk'
import { addToFavorites, getAllFavorites, removeFromFavorites } from '../store/thunk/FavoriteThunk'
import moment from 'moment'
import 'moment/locale/ru'
import { isBgColor } from '../src/utils/background'
import { Map, Placemark, YMaps } from 'react-yandex-maps'
import SubscriptionMap from './SubscriptionMaps/SubscriptionMaps'
import { handleCountFavorites, handleUserAlreadyAddedToFavorites } from '../scripts/FavoriteScripts'
import { Favorite } from '../interface/EventFetch'
import Chat from './Chat'

moment.locale('ru')

const apiUrl = import.meta.env.VITE_API_URL;


export const EventItem = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const [organizer, setOrganizer] = useState<any>(null) 
  const [showChat, setShowChat] = useState(false);
  const { events, loading: eventsLoading } = useSelector((state: RootState) => state.Events)
  console.log(id );
  
 const toggleChat = () => {
   setShowChat((prev) => !prev);
 };
 

  const [showRoute, setShowRoute] = useState(false);

  // Получаем массив объектов, кто куда подал заявку на участие
  const allFavorites = useSelector(
    (state: RootState) => state.Favorites.favorites
  )

  const [localFavorites, setLocalFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    setLocalFavorites(allFavorites);
  }, [allFavorites]);

  const handleAddToFavorites = () => {
    if (event) {
      dispatch(addToFavorites({ eventId: event.id, userId: userId }))
        .then(() => dispatch(getAllFavorites()));
    }
  }

  const handleRemoveFromFavorites = () => {
    if (event) {
      dispatch(removeFromFavorites({eventId: event.id, userId: userId}))
        .then(() => dispatch(getAllFavorites()));
    }
  }

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const event = events.find((e) => e.id.toString() === id);

  useEffect(() => {
    if (event) {
      dispatch(getAllFavorites()) //Добавил вытягивание всех "фаворитов"
      dispatch(fetchUsers(event.userId)).then((res) => {
        setOrganizer(res.payload)
      })
    }
  }, [dispatch, event]);

  const userData = JSON.parse(localStorage.getItem('user') || '{}')
  const userId = userData.id


  if (eventsLoading) {
    return <div>Загрузка данных...</div>
  }

  if (!event) {
    return <div>Событие не найдено</div>;
  }

  const eventCoordinates =
    event.latitude && event.longitude
      ? ([event.latitude, event.longitude] as [number, number])
      : null;

  return (
    <div className={styles.eventItem}>
      <h2 className={styles.eventTitle}>{event.title}</h2>
      {isBgColor(event.background || '') ? (
        <div
          className={styles.eventImage}
          style={{ backgroundColor: event.background }}
        ></div>
      ) : (
        <img
          className={styles.eventImage}
          src={
            event.background
              ? `${apiUrl}${event.background}`
              : '/default-background.jpg'
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
                    : '/default-background.jpg'
                }
                alt='avatar'
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
          <div className={styles.eventCity}>Цена: {event.price} ₽</div>
          <div className={styles.eventDate}>
            Начало: {moment(event.start_date).format("D MMMM YYYY, HH:mm")}
            {event.end_date ? ` до ${moment(event.end_date).format("HH:mm")}` : ""}
          </div>

          {eventCoordinates && (
            <div className={styles.mapContainer}>
              <YMaps>
                <Map
                  state={{ center: eventCoordinates, zoom: 10 }}
                  width="100%"
                  height="300px">
                  <Placemark geometry={eventCoordinates} />
                </Map>
              </YMaps>
            </div>
          )}

          {event.maxPeople ? (
            <>
              <div className={styles.eventCity}>Количество участников: {handleCountFavorites(event.id, localFavorites)}/{event.maxPeople}</div>
              
              {handleUserAlreadyAddedToFavorites(event.id, userId, localFavorites) ? (
                <div className={styles.eventCity}>Вы уже участвуете в этом мероприятии</div>
              ) : handleCountFavorites(event.id, allFavorites) === event.maxPeople ? (
                <div className={styles.eventCity}>В этом мероприятии уже максимальное количество участвующих</div>
              ) : (
                <div className={styles.eventCity}>Вы можете присоединиться к этому мероприятию</div>
              )}
            </>
          ) : (
            <>
              <div className={styles.eventCity}>Вы можете присоединиться к этому мероприятию</div>
              <div className={styles.eventCity}>Количество участников: {handleCountFavorites(event.id, localFavorites)}</div>
            </>
          )}

          <div className={styles.eventButtonContainer}>
         
          <button className={styles.eventButton} onClick={toggleChat}>
  Задать вопрос
</button>

{showChat && (
  <div className={`${styles.chatContainer} ${showChat ? styles.open : ''}`}>
    <Chat eventId={event.id} userId={userId} />
  </div>
)}
            {handleUserAlreadyAddedToFavorites(event.id, userId, localFavorites) ? (
              <button className={styles.eventButton} onClick={handleRemoveFromFavorites}>
                Отказаться
              </button>
            ) : handleCountFavorites(event.id, localFavorites) === event.maxPeople ? (
              <button className={styles.eventInactiveButton}>
                Нет мест
              </button>
            ) : (
              <button className={styles.eventButton} onClick={handleAddToFavorites}>
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
      {showRoute && eventCoordinates && (
        <SubscriptionMap
          eventCoordinates={eventCoordinates}
          onClose={() => setShowRoute(false)}
        />
      )}
    </div>
  );
};
