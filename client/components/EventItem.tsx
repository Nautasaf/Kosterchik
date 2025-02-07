import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './EventItem.module.scss';
import { RootState, AppDispatch } from '../store/Index';
import { fetchUsers } from '../store/thunk/AllUserThunk';
import { fetchEvents } from '../store/thunk/EventThunk';
import { addToFavorites } from '../store/thunk/FavoriteThunk';
import moment from 'moment'; 
import 'moment/locale/ru'; 
moment.locale('ru');

export const EventItem = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const { events, loading: eventsLoading } = useSelector(
    (state: RootState) => state.Events,
  )
  const { users, loading: usersLoading } = useSelector(
    (state: RootState) => state.AllUsers,
  )

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  const event = events.find((e) => e.id.toString() === id)

  useEffect(() => {
    if (event) {
      dispatch(fetchUsers(event.userId))
    }
  }, [dispatch, event])

  const userData = JSON.parse(localStorage.getItem('userss') || '{}'); 
  const userId = userData.id; 
  
  
  const handleAddToFavorites = () => {
    if (event) {
      dispatch(addToFavorites({ eventId: event.id, userId: userId }));
    }
  };


  if (eventsLoading || usersLoading) {
    return <div>Загрузка данных...</div>
  }

  if (!event) {
    return <div>Событие не найдено</div>
  }

  return (
    <div className={styles.eventItem}>
      <h2 className={styles.eventTitle}>{event.title}</h2>
      <img
        className={styles.eventImage}
        src={event.imageUrl}
        alt={event.title}
      />

      <div className={styles.eventColumns}>
        <div className={styles.eventColumn}>
          <div className={styles.containerProfile}>
            <h2>Профиль организатора</h2>
            <img
              className={styles.profilePhoto}
              src={users?.photoUrl}
              alt='avatar'
            />
            <div className={styles.profileInfo}>
              <p>Имя: {users?.username}</p>
              <p>Email: {users?.email}</p>
              <p>Город: {users?.city}</p>
            </div>
          </div>
        </div>

        <div className={styles.eventColumn}>
          <div className={styles.eventDescription}>{event.description}</div>
          <div className={styles.eventCity}>Город: {event.city}</div>
          <div className={styles.eventCity}>Место: {event.district}</div>
          {event.maxPeople ? (
            <div className={styles.eventCity}>Количество участников: {event.people}/{event.maxPeople}</div>
          ) : (
            <div className={styles.eventCity}>Количество участников: {event.people}</div>
          )}
          <div className={styles.eventDate}>
            Начало: {moment(event.start_date).format("D MMMM YYYY, HH:mm")} 
          {event.end_date ? ` до ${moment(event.end_date).format("HH:mm")}` : ""}
</div>

          <div className={styles.eventButtonContainer}>
            <button
              className={styles.eventButton}
              onClick={() => console.log('Задать вопрос')}
            >
              Задать вопрос
            </button>
            <button
              className={styles.eventButton}
              onClick={handleAddToFavorites}
            >
              Я готов
            </button>
            <button
              className={styles.eventButton}
              onClick={() => console.log('Участники')}
            >
              Участники
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
