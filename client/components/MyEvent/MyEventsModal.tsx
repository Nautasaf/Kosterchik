import React, { useEffect, useState } from 'react'
import styles from './MyEventsModal.module.scss'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/Index'
import { deleteEvent } from '../../store/slice/EventSlice'
import { useNavigate } from 'react-router-dom'
import { Event } from '../../interface/EventFetch'
import ParticipantsModal from '../Participants/ParticipantsModal'

interface MyEventsModalProps {
  events: Event[]
  onClose: () => void
}

const MyEventsModal: React.FC<MyEventsModalProps> = ({ events, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [localEvents, setLocalEvents] = useState(events)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setLocalEvents(events)
  }, [events])

  const handleNavigateToEvent = (id: number) => () => {
    if (id) {
      navigate(`/event/${id}`);
    } else {
      console.error('Invalid event ID');
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (window.confirm('Вы уверены, что хотите удалить это событие?')) {
      try {
        await dispatch(deleteEvent(eventId)).unwrap()
        alert('Событие успешно удалено!')
        setLocalEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventId),
        )
      } catch (error) {
        console.error('Ошибка при удалении события:', error)
        alert('Произошла ошибка при удалении события.')
      }
    }
  }

  const handleEditEvent = (eventId: number) => {
    navigate(`/edit-event/${eventId}`)
    onClose()
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>❌</button>
        <h2>Мои события</h2>
        <div className={styles.eventListContainer}>
          <ul className={styles.eventList}>
            {localEvents.length > 0 ? (
              localEvents.map((event) => (
                <li key={event.id} onClick={handleNavigateToEvent(event.id)}>
                  {event.title}
                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.participantsButton}
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsModalOpen(true)
                      }}
                    >
                      Участники
                    </button>
                    {isModalOpen && (
                      <ParticipantsModal
                        event={event}
                        onClose={() => setIsModalOpen(false)}
                      />
                    )}
                    <button
                      className={styles.editButton}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditEvent(event.id)
                      }}
                    >
                      Редактировать
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteEvent(event.id)
                      }}
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
    </div>
  )
}

export default MyEventsModal
