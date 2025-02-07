import React, { useEffect, useState } from 'react'
import styles from './MyEventsModal.module.scss'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/Index'
import { deleteEvent } from '../../store/slice/EventSlice'
import { useNavigate } from 'react-router-dom'

interface MyEventsModalProps {
  events: any[]
  onClose: () => void
}

const MyEventsModal: React.FC<MyEventsModalProps> = ({ events, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  // Локальное состояние для списка событий
  const [localEvents, setLocalEvents] = useState(events)

  // Обновляем локальный список при изменении `events`
  useEffect(() => {
    setLocalEvents(events)
  }, [events])

  // Функция удаления события
  const handleDeleteEvent = async (eventId: number) => {
    if (window.confirm('Вы уверены, что хотите удалить это событие?')) {
      try {
        await dispatch(deleteEvent(eventId)).unwrap()
        alert('Событие успешно удалено!')

        // Убираем удаленное событие из локального списка
        setLocalEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventId),
        )
      } catch (error) {
        console.error('Ошибка при удалении события:', error)
        alert('Произошла ошибка при удалении события.')
      }
    }
  }

  // Функция редактирования события
  const handleEditEvent = (eventId: number) => {
    navigate(`/edit-event/${eventId}`)
    onClose()
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Мои события</h2>
        <button className={styles.closeButton} onClick={onClose}>
          Закрыть
        </button>
        <ul>
          {localEvents.length > 0 ? (
            localEvents.map((event) => (
              <li key={event.id}>
                {event.title}
                <div className='blockButton'>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditEvent(event.id)}
                >
                  Редактировать
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Удалить
                </button>
                </div>
              </li>
            ))
          ) : (
            <p>У вас пока нет событий.</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default MyEventsModal
