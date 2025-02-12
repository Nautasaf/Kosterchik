import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/Index";
import { useNavigate } from "react-router-dom";
import styles from "./CreateEvent.module.scss";
import { createEvent } from "../../store/slice/EventSlice";
import MapPicker from "../MapPicker";
import { toast } from "react-toastify";
import { addToFavorites } from "../../store/thunk/FavoriteThunk";

// interface IEventData {
//   title: string;
//   description: string;
//   city: string;
//   date: string;
//   userId: number;
//   imageUrl: string;
//   background: string;
//   requirements: string;
//   latitude: number;
//   longitude: number;
//   maxPeople: number
//   start_date: string
//   end_date: string
//   price: number
//   event_type: string
//   age_restriction: number
//   duration: number
//   district: string
//   format: string
//   language: string
//   accessibility: boolean
//   organizer: string
// }

const CreateEvent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Основные поля события
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState(user.city || "");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [background, setBackground] = useState("#ffffff");
  const [district, setDistrict] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [maxPeople, setMaxPeople] = useState<number>(0);
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [event_type, setEvent_type] = useState("");
  const [age_restriction, setAge_restriction] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [format, setFormat] = useState("");
  const [language, setLanguage] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [markerIcon, setMarkerIcon] = useState<string>("fire");

  // Состояние для координат события – по умолчанию центр Москвы
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 55.751244,
    lng: 37.618423,
  });

  // При монтировании пытаемся получить текущую геолокацию пользователя
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("Получена геолокация:", coords);
          setLocation(coords);
        },
        (error) => {
          console.error("Ошибка получения геолокации:", error);
          setLocation({ lat: 55.751244, lng: 37.618423 });
        }
      );
    } else {
      console.error("Геолокация не поддерживается браузером");
      setLocation({ lat: 55.751244, lng: 37.618423 });
    }
  }, []);

  // Функция загрузки фонового изображения на сервер
  const uploadBackground = async (file: File) => {
    const formData = new FormData();
    formData.append("backgroundImage", file);
    const response = await fetch(`${apiUrl}/uploads/background`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.imageUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.id) {
      toast("Необходимо авторизоваться для создания события.");
      return;
    }
    if (!location) {
      toast("Местоположение не определено, попробуйте позже.");
      return;
    }

    let backgroundUrl = background;
    if (file) {
      try {
        backgroundUrl = await uploadBackground(file);
      } catch (error) {
        toast.error("Ошибка загрузки фонового изображения", error);
        toast("Не удалось загрузить фоновое изображение!");
        return;
      }
    }

    // Логируем используемые координаты перед отправкой запроса
    console.log("Используем координаты:", location);

    const eventData = {
      title,
      description,
      city,
      date,
      userId: user.id,
      imageUrl: user.photoUrl,
      requirements,
      maxPeople,
      start_date,
      end_date,
      price,
      event_type,
      age_restriction,
      duration,
      district,
      format,
      language,
      organizer,
      background: backgroundUrl,
      longitude: location.lng,
      latitude: location.lat,
      markerIcon,
    };

    try {
      const createdEvent = await dispatch(createEvent(eventData)).unwrap();
      await dispatch(
        addToFavorites({ eventId: createdEvent.id, userId: user.id })
      );
      toast.success("Событие успешно создано!");
      navigate("/");
    } catch (error) {
      console.error("Ошибка при создании события:", error);
      alert("Произошла ошибка при создании события.");
    }
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "eventType") {
      setEvent_type(value);
    }
  };

  return (
    <div className={styles.createEventContainer}>
      <h2>Создать событие</h2>
      <form onSubmit={handleSubmit}>
        {/* Основные поля */}
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
          <label>Город:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        {/* Дополнительные поля */}
        <div className={styles.formGroup}>
          <label>Максимальное количество человек:</label>
          <input
            type="number"
            value={maxPeople}
            onChange={(e) => setMaxPeople(Number(e.target.value))}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Дата начала события:</label>
          <input
            type="date"
            value={start_date}
            onChange={(e) => setStart_date(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Дата окончания события:</label>
          <input
            type="date"
            value={end_date}
            onChange={(e) => setEnd_date(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Цена билета ₽:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value.replace(/[^0-9]/g, "");
              setPrice(numericValue ? Number(numericValue) : 0);
            }}
            required
          />
        </div>

        <label>
          <p>Тип события:</p>
          <select
            name="eventType"
            value={event_type}
            onChange={handleSelectChange}>
            <option value="">Любой</option>
            <option value="Ресторан">Рестораны</option>
            <option value="Экстрим">Экстрим</option>
            <option value="Шашлык">Шашлык</option>
            <option value="Концерт">Концерт</option>
            <option value="Выставка">Выставка</option>
            <option value="Театр">Театр</option>
            <option value="Спортивное событие">Спортивное событие</option>
            <option value="Фестиваль">Фестиваль</option>
            <option value="Семинар">Семинар</option>
            <option value="Бар">Бар</option>
            <option value="Лекция">Лекция</option>
          </select>
        </label>

        <div className={styles.formGroup}>
          <label>Возрастное ограничение:</label>
          <input
            type="text"
            value={age_restriction}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value.replace(/[^0-9]/g, "");
              setAge_restriction(numericValue ? Number(numericValue) : 0);
            }}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Длительность минуты:</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value.replace(/[^0-9]/g, "");
              setDuration(numericValue ? Number(numericValue) : 0);
            }}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Район (место проведения):</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Формат (онлайн/оффлайн):</label>
          <input
            type="text"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Язык события:</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Организатор:</label>
          <input
            type="text"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Фоновый цвет карточки:</label>
          <input
            type="color"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Фоновое изображение:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Выберите место проведения:</label>
          <MapPicker
            onLocationSelect={(coords) => {
              console.log("Новые координаты из MapPicker:", coords);
              setLocation(coords);
            }}
            initialCoordinates={location}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Выберите иконку события:</label>
          <select
            value={markerIcon}
            onChange={(e) => setMarkerIcon(e.target.value)}>
            <option value="fire">🔥 Огонь (Костёр)</option>
            <option value="music">🎵 Музыка</option>
            <option value="party">🎉 Вечеринка</option>
            <option value="sport">⚽ Спорт</option>
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>
          Создать событие
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
