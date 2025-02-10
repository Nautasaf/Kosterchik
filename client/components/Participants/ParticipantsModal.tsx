import { useSelector } from "react-redux"
import styles from './Participants.module.scss'
import { RootState } from "../../store/Index"
import React, { useEffect, useMemo, useState } from "react"
import { Event, Favorite } from "../../interface/EventFetch"
import { handleCountFavorites, handleEventFavorites } from "../../scripts/FavoriteScripts"

interface ParticipantsModalProps {
  event: Event
  onClose: () => void
}

const ParticipantsModal: React.FC<ParticipantsModalProps> = ({ event, onClose }) => {  
  // Локальное состояние для списков событий и участников
  const [localFavorites, setLocalFavorites] = useState<Favorite[]>([]);

  const allFavorites = useSelector(
    (state: RootState) => state.Favorites.favorites
  )

  const eventFavorites = useMemo(() => {
    return handleEventFavorites(event.id, allFavorites);
  }, [event.id, allFavorites]);

  useEffect(() => {
    setLocalFavorites(allFavorites);
  }, [allFavorites]);

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