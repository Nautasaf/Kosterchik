import { useDispatch, useSelector } from "react-redux"
import styles from './Participants.module.scss'
import { useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../store/Index"
import React, { useEffect, useMemo, useState } from "react"
import { Event, Favorite } from "../../interface/EventFetch"
import axios from "axios"
import { handleCountFavorites, handleEventFavorites } from "../../scripts/FavoriteScripts"

const apiUrl = import.meta.env.VITE_API_URL;

interface ParticipantsModalProps {
  event: Event
  onClose: () => void
}

const ParticipantsModal: React.FC<ParticipantsModalProps> = ({ event, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const user = useSelector((state: RootState) => state.user)
  
  // Локальное состояние для списков событий и участников
  const [localFavorites, setLocalFavorites] = useState<Favorite[]>([]);
  const [userEvents, setUserEvents] = useState<Event[]>([])

  const allFavorites = useSelector(
    (state: RootState) => state.Favorites.favorites
  )

  const eventFavorites = useMemo(() => {
    return handleEventFavorites(event.id, allFavorites);
  }, [event.id, allFavorites]);

  useEffect(() => {
    setLocalFavorites(allFavorites);
  }, [allFavorites]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/events/user/${user.id}`,
        )
        setUserEvents(response.data.events)
      } catch (error) {
        console.error('Ошибка при получении событий пользователя:', error)
      }
    }

    if (user.id) {
      fetchUserEvents()
    }
  }, [user.id])

  if (!allFavorites || allFavorites.length === 0) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <p>Загрузка участников...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={onClose}>
            ❌       
          </button>
          <h2>Участники события: {event.title}</h2>
          <ul>
            {handleCountFavorites(event.id, localFavorites) > 0 ? (
              eventFavorites.map((fav) => (
                <li key={fav.userId}>{fav.userId}</li>
              ))
            ) : (
              <p>Пока нет участников</p>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default ParticipantsModal