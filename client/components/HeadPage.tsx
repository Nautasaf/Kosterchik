import { useEffect, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './HeadPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../store/thunk/EventThunk'
import { RootState, AppDispatch } from '../store/Index'
import moment from 'moment'
import 'moment/locale/ru'
import { Sidebar } from './SideBar'
import React from 'react'
import { isBgColor } from '../src/utils/background'

moment.updateLocale('ru', {
  months: [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ],
  monthsShort: [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ],
})

export const HeadPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { events, loading, error } = useSelector(
    (state: RootState) => state.Events,
  )
  const filters = useSelector((state: RootState) => state.search.filters)

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesTitle = filters.title
        ? event.title.toLowerCase().includes(filters.title.toLowerCase())
        : true
      const matchesCity = filters.city
        ? event.city.toLowerCase().includes(filters.city.toLowerCase())
        : true
      const matchesDate = filters.date
        ? event.start_date.startsWith(filters.date)
        : true
      const matchesPrice =
        !filters.price || Number(filters.price) === 0
          ? true
          : (event.price ?? 0) <= Number(filters.price)

      const matchesType = filters.event_type
        ? (event.event_type ?? '')
            .toLowerCase()
            .includes(filters.event_type.toLowerCase())
        : true

      const matchesAge = filters.age_restriction
        ? (event.age_restriction ?? 0) >= Number(filters.age_restriction)
        : true

      const matchesDuration = filters.duration
        ? (event.duration ?? 0) >= Number(filters.duration)
        : true
      const matchesDistrict = filters.district
        ? event.district
            ?.toLowerCase()
            .includes(filters.district.toLowerCase()) || false
        : true
      const matchesFormat = filters.format
        ? (event.format ?? '')
            .toLowerCase()
            .includes(filters.format.toLowerCase())
        : true
      const matchesSeats = filters.available_seats
        ? (event.available_seats ?? 0) >= Number(filters.available_seats)
        : true
      const matchesLanguage = filters.language
        ? (event.language ?? '').toLowerCase().trim() ===
          filters.language.toLowerCase().trim()
        : true
      const matchesAccessibility = filters.accessibility
        ? event.accessibility === filters.accessibility
        : true
      const matchesRating = filters.rating
        ? (event.rating ?? 0) >= Number(filters.rating)
        : true
      const matchesOrganizer = filters.organizer
        ? event.organizer
            ?.toLowerCase()
            .includes(filters.organizer.toLowerCase()) || false
        : true
      const matchesPopularity =
        !filters.popularity || Number(filters.popularity) === 0
          ? true
          : (event.popularity ?? 0) >= Number(filters.popularity)

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
      )
    })
  }, [events, filters])

  if (loading) return <div>Загрузка...</div>
  if (error) return <div>Произошла ошибка: {error}</div>

  return (
    <div className={styles.headPageContainer}>
      <Sidebar />
      <h1 className={styles.pageTitle}>Все события</h1>
      <div className={styles.eventList}>
        {filteredEvents.length === 0 ? (
          <div>Нет доступных событий</div>
        ) : (
          filteredEvents.map((event) => (
            <NavLink
              to={`/event/${event.id}`}
              key={event.id}
              className={styles.eventItem}
            >
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
              <p className={styles.eventInfo}>{event.description}</p>
              <p className={styles.eventCity}>Город: {event.city}</p>
              <p className={styles.eventCity}>Место: {event.district}</p>
              <div className={styles.eventDate}>
                Начало: {moment(event.start_date).format('D MMMM YYYY, HH:mm')}
                {event.end_date
                  ? ` до ${moment(event.end_date).format('HH:mm')}`
                  : ''}
              </div>
            </NavLink>
          ))
        )}
      </div>
    </div>
  )
}
