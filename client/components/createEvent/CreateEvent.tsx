// CreateEvent.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Index";
import { useNavigate } from "react-router-dom";
import styles from "./CreateEvent.module.scss";
import { createEvent } from "../../store/slice/EventSlice";
import { AppDispatch } from "../../store/Index";
import MapPicker from "../MapPicker";

interface IEventData {
  title: string;
  description: string;
  city: string;
  date: string;
  userId: number;
  imageUrl: string;
  background: string;
  requirements: string;
  latitude: number; // новые поля
  longitude: number;
}

const CreateEvent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState(user.city || "");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [background, setBackground] = useState("#ffffff");
  // Начальные координаты — по умолчанию Москва
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 55.751244,
    lng: 37.618423,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.id) {
      alert("Необходимо авторизоваться для создания события.");
      return;
    }

    const eventData: IEventData = {
      title,
      description,
      city,
      date,
      userId: user.id,
      imageUrl: user.photoUrl,
      background,
      requirements,
      latitude: location.lat,
      longitude: location.lng,
    };

    try {
      await dispatch(createEvent(eventData)).unwrap();
      alert("Событие успешно создано!");
      navigate("/");
    } catch (error) {
      console.error("Ошибка при создании события:", error);
      alert("Произошла ошибка при создании события.");
    }
  };

  return (
    <div className={styles.createEventContainer}>
      <h2>Создать событие</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Название события:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Дата события:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Описание события:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Требования:</label>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Город:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Цвет фона карточки:</label>
          <input
            type="color"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Выберите место проведения:</label>
          <MapPicker
            onLocationSelect={(coords) => setLocation(coords)}
            initialCoordinates={location}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Создать событие
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
