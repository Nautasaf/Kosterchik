import { useDispatch, useSelector } from "react-redux";
import styles from './Participants.module.scss';
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/Index";
import React, { useEffect, useMemo, useState } from "react";
import { Event, Favorite, User } from "../../interface/EventFetch";
import axios from "axios";
import { handleCountFavorites, handleEventFavorites } from "../../scripts/FavoriteScripts";

const apiUrl = import.meta.env.VITE_API_URL;

interface ParticipantsModalProps {
  event: Event;
  onClose: () => void;
}

const ParticipantsModal: React.FC<ParticipantsModalProps> = ({ event, onClose }) => {
 

  const user = useSelector((state: RootState) => state.user);
  
 
  const [localFavorites, setLocalFavorites] = useState<Favorite[]>([]);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [userDetails, setUserDetails] = useState<{ [key: string]: User }>({});
  const [approvedUsers, setApprovedUsers] = useState<Set<number>>(new Set()); 
  const [filteredFavorites, setFilteredFavorites] = useState<Favorite[]>([]); 
  const allFavorites = useSelector((state: RootState) => state.Favorites.favorites);

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
        );
        console.log("User events:", response.data.events);
        setUserEvents(response.data.events);
      } catch (error) {
        console.error('Ошибка при получении событий пользователя:', error);
      }
    };

    if (user.id) {
      fetchUserEvents();
    }
  }, [user.id]);

  const fetchUserDetails = async (userId: number) => {
    try {
      const response = await axios.get(`${apiUrl}/users/${userId}`);
      console.log("User details:", response.data); 
      setUserDetails((prev) => ({
        ...prev,
        [userId]: response.data,
      }));
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    }
  };

  useEffect(() => {
    eventFavorites.forEach((fav) => {
      if (!userDetails[fav.userId]) {
        fetchUserDetails(fav.userId);
      }
    });
  }, [eventFavorites, userDetails]);






  const handleApprove = async (userId: number) => {
    setApprovedUsers((prev) => new Set(prev.add(userId))); 
    try {
      await axios.post(`${apiUrl}/info`, { userId, eventId: event.id });
      console.log(`Одобрить участника с ID: ${userId}`);
    } catch (error) {
      console.error('Ошибка при одобрении участника:', error);
    }
  };
  

  const handleReject = async (userId: number) => {
    setFilteredFavorites((prevFavorites) => prevFavorites.filter(fav => fav.userId !== userId));
    try {
      await axios.post(`${apiUrl}/info/reject`, { userId, eventId: event.id });
      console.log(`Отказать участнику с ID: ${userId}`);
    } catch (error) {
      console.error('Ошибка при отказе участника:', error);
    }
  };





  useEffect(() => {
    setFilteredFavorites(eventFavorites);
  }, [eventFavorites]);

  if (!allFavorites || allFavorites.length === 0) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <p>Загрузка участников...</p>
        </div>
      </div>
    );
  }
// UI
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
            filteredFavorites.map((fav) => {
              const userDetail = userDetails[fav.userId];
              console.log("User detail for participant:", userDetail);
              return userDetail ? (
                <li key={fav.userId}>
                  <p>{userDetail.username}</p>
                  <p>{userDetail.city}</p>
                  <div>
                    {approvedUsers.has(fav.userId) ? (
                      <span className={styles.approved}>✔ Одобрено</span>
                    ) : (
                      <>
                        <button onClick={() => handleApprove(fav.userId)} className={styles.approveButton}>
                          Одобрить
                        </button>
                        <button onClick={() => handleReject(fav.userId)} className={styles.rejectButton}>
                          Отказать
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ) : (
                <li key={fav.userId}>Загрузка данных участника...</li>
              );
            })
          ) : (
            <p>Пока нет участников</p>
          )}
        </ul>
      </div>
    </div>
  </>
);
}

export default ParticipantsModal;