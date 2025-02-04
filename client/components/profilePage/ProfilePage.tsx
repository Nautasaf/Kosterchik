import React, { useState, useEffect } from 'react';
import styles from './ProfilePage.module.scss';
import ProfilePhoto from '../profilePhoto/ProfilePhoto';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Index';
import { useNavigate } from 'react-router-dom';
import MyEventsModal from '../MyEvent/MyEventsModal';
import axios from 'axios';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEvents, setUserEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/events/user/${user.id}`);
        setUserEvents(response.data.events);
      } catch (error) {
        console.error('Ошибка при получении событий пользователя:', error);
      }
    };

    if (user.id) {
      fetchUserEvents();
    }
  }, [user.id]);

  return (
    <div className={styles.containerProfile}>
      <h2>Профиль</h2>
      <ProfilePhoto photoUrl={user.photoUrl || ''} altText={'avatar'} />
      <div className={styles.profileInfo}>
        <p>Имя: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Город: {user.city}</p>
      </div>
      <div className={styles.buttonsBlock}>
        <button className={styles.button1} onClick={()=>navigate('/history')} onClick={() => navigate('/history')}>
          История
        </button>
        <button className={styles.button1} onClick={() => setIsModalOpen(true)}>
          Мои события
        </button>
        <button
          className={styles.button2}
          onClick={() => navigate('/create-event')}
        >
          Предложить событие
        </button>
      </div>

      {isModalOpen && (
        <MyEventsModal
          events={userEvents}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;

