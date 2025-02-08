import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/Index';
import { editEvent } from '../../store/slice/EventSlice';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditEventPage.module.scss';
import MapPicker from "../MapPicker";
import { Event } from '../../interface/EventFetch';

const EditEventPage: React.FC = () => {
  const defaultEvent:Event = {
    id: 1 ,
    title: 'string',
    description: 'string',
    city: 'string',
    start_date: 'string',
    end_date: 'string',
    userId: 1,
    maxPeople: 10,
    date: 'string',
    createdAt: 'string',
    updatedAt: 'string',
    longitude: 1,
    latitude: 1
  }

  const apiUrl = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [eventData, setEventData] = useState<Event>(defaultEvent);
  const [file, setFile] = useState<File | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    if (eventId) {
      fetchEventById(Number(eventId));
    }
  }, [eventId]);

  const fetchEventById = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}/events/${id}`);
      if (!response.ok) throw new Error("Ошибка при получении события");
      const data = await response.json();
      setEventData(data);
      if (data.latitude && data.longitude) {
        setLocation({ lat: data.latitude, lng: data.longitude });
      } else {
        setLocation({ lat: 55.751244, lng: 37.618423 });
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Не удалось загрузить данные события.');
    }
  };

  const uploadBackground = async (file: File) => {
    const formData = new FormData();
    formData.append('backgroundImage', file);

    try {
      const response = await fetch(`${apiUrl}/uploads/background`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error('Ошибка загрузки фонового изображения', error);
      alert('Не удалось загрузить изображение!');
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let backgroundUrl = eventData.background;

    if (file) {
      const uploadedUrl = await uploadBackground(file);
      if (!uploadedUrl) return;
      backgroundUrl = uploadedUrl;
    }

    try {
      const updatedData = {
        ...eventData,
        latitude: location ? location.lat : 55.751244,
        longitude: location ? location.lng : 37.618423,
        background: backgroundUrl
      };
      await dispatch(
        editEvent({ eventId: Number(eventId), updatedData })
      ).unwrap();
      alert("Событие успешно обновлено!");
      navigate("/");
    } catch (error) {
      console.error("Ошибка при обновлении события:", error);
      alert("Произошла ошибка при обновлении события.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.editEventContainer}>
      <h2 className={styles.editEventHeader}>Редактирование события</h2>
      <form onSubmit={handleSubmit} className={styles.editEventForm}>
        <div className={styles.formGroup}>
          <label>Название:</label>
          <input
            type="text"
            name="title"
            value={eventData.title || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Описание:</label>
          <textarea
            name="description"
            value={eventData.description || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Город:</label>
          <input
            type="text"
            name="city"
            value={eventData.city || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Дата:</label>
          <input type="date" name="date" value={eventData.date || ''} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Требования:</label>
          <textarea
            name="requirements"
            value={eventData.requirements || ""}
            onChange={handleChange}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Максимальное количество человек:</label>
          <textarea
            name="maxPeople"
            value={eventData.maxPeople || ''}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Цвет фона:</label>
          <input type="color" name="background" value={eventData.background || '#ffffff'} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Фоновое изображение:</label>
          <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
        </div>
        <div className={styles.formGroup}>
          <label>Место проведения:</label>
          <MapPicker
            onLocationSelect={(coords) => setLocation(coords)}
            initialCoordinates={location || { lat: 55.751244, lng: 37.618423 }}
          />
        </div>
        <button type="submit" className={styles.editEventButton}>
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default EditEventPage;
