import { NavLink, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/Index'
import style from './CategoryPage.module.scss'
import moment from 'moment'
import 'moment/locale/ru'

export const CategoryPage = () => {
  const { eventType } = useParams()
  const eventsState = useSelector((state: RootState) => state.Events)

  console.log(eventType)

  const events = Array.isArray(eventsState.events) ? eventsState.events : []

  const categoryMapping: Record<string, string> = {
    restaurants: 'Ресторан',
    concerts: 'Концерт',
    exhibitions: 'Выставка',
    extreme: 'Экстрим',
    theaters: 'Театр',
    sports: 'Спортивное событие',
    festivals: 'Фестиваль',
    seminars: 'Семинар',
    bars: 'Бар',
    shashlyk: 'Шашлык',
    lectures: 'Лекция',
  }

  const categoryValue =
    categoryMapping[eventType as keyof typeof categoryMapping]

  const filteredEvents = events.filter(
    (event) =>
      event.event_type &&
      event.event_type.toLowerCase() === categoryValue?.toLowerCase(),
  )

  if (!eventType || !categoryValue) {
    return <p>Тип события не указан или не найден.</p>
  }

  return (
    <div className={style.pageWrapper}>
      <header className={style.header}>
        <h1 className={style.title}>События в категории: {categoryValue}</h1>
      </header>

      {filteredEvents.length > 0 ? (
        <div className={style.sliderContainer}>
          <div className={style.eventsSlider}>
            {filteredEvents.map((event) => (
              <div className={style.eventItem} key={event.id}>
                <NavLink to={`/event/${event.id}`} className={style.eventLink}>
                  <h2 className={style.eventTitle}>{event.title}</h2>
                  <p className={style.eventInfo}>{event.description}</p>
                  <p className={style.eventCity}>Город: {event.city}</p>
                  <p className={style.eventDistrict}>Место: {event.district}</p>
                  <div className={style.eventDate}>
                    Начало:{' '}
                    {moment(event.start_date).format('D MMMM YYYY, HH:mm')}
                    {event.end_date
                      ? ` до ${moment(event.end_date).format('HH:mm')}`
                      : ''}
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className={style.noEvents}>Событий в этой категории нет.</p>
      )}
    </div>
  )
}
