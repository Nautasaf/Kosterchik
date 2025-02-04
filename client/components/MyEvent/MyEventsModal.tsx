import React from 'react'
import styles from './MyEventsModal.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../store/Index' // Путь может отличаться
import { deleteEvent } from '../../store/slice/EventSlice' // Импортируйте thunk для удаления
import { useNavigate } from 'react-router-dom'

interface MyEventsModalProps {
  events: any[]
  onClose: () => void
}

const MyEventsModal: React.FC<MyEventsModalProps> = ({ events, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  // Функция для обработки удаления события
  const handleDeleteEvent = async (eventId: number) => {
    if (window.confirm('Вы уверены, что хотите удалить это событие?')) {
      try {
        await dispatch(deleteEvent(eventId)).unwrap()
        alert('Событие успешно удалено!')
        onClose() // Закрываем модальное окно после удаления
      } catch (error) {
        console.error('Ошибка при удалении события:', error)
        alert('Произошла ошибка при удалении события.')
      }
    }
  }

  // Функция для обработки редактирования события
  const handleEditEvent = (eventId: number) => {
    navigate(`/edit-event/${eventId}`) // Переход на страницу редактирования
    onClose() // Закрываем модальное окно
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Мои события</h2>
        <button className={styles.closeButton} onClick={onClose}>
          Закрыть
        </button>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.title}
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MyEventsModal
