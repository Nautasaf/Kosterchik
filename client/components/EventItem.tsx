import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './EventItem.module.scss'
import { RootState, AppDispatch } from '../store/Index'
import { fetchUsers } from '../store/thunk/AllUserThunk'
import { fetchEvents } from '../store/thunk/EventThunk'
import moment from 'moment'
import 'moment/locale/ru'
import { isBgColor } from '../src/utils/background'

moment.locale('ru')

export const EventItem = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const [organizer, setOrganizer] = useState<any>(null)

  const { events, loading: eventsLoading } = useSelector(
    (state: RootState) => state.Events,
  )

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  const event = events.find((e) => e.id.toString() === id)

  useEffect(() => {
    if (event) {
      dispatch(fetchUsers(event.userId)).then((res) => {
        setOrganizer(res.payload) // Сохраняем организатора в локальном стейте
      })
    }
  }, [dispatch, event])

  if (eventsLoading) {
    return <div>Загрузка данных...</div>
  }

  if (!event) {
    return <div>Событие не найдено</div>
  }

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
              ? `http://localhost:3000${event.background}`
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
                    ? `http://localhost:3000${organizer.photoUrl}`
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
          <div className={styles.eventCity}>{event.city}</div>
          <div className={styles.eventDate}>
            {moment(event.date).format('D MMMM YYYY, HH:mm')}
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
              onClick={() => console.log('Я готов')}
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
