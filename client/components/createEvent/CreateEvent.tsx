import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Index";
import { useNavigate } from "react-router-dom";
import styles from "./CreateEvent.module.scss";
import { createEvent } from "../../store/slice/EventSlice";
import { AppDispatch } from "../../store/Index";
import MapPicker from "../MapPicker";
import { toast } from 'react-toastify'
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
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user)

  const apiUrl = import.meta.env.VITE_API_URL;


  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState(user.city || "");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [background, setBackground] = useState("#ffffff");
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 55.751244,
    lng: 37.618423,
  });
  const [markerIcon, setMarkerIcon] = useState<string>("fire");
  const [file, setFile] = useState<File | null>(null)
  const [maxPeople, setMaxPeople] = useState(0)
  const [start_date, setStart_date] = useState('')
  const [end_date, setEnd_date] = useState('')
  const [price, setPrice] = useState(0)
  const [event_type, setEvent_type] = useState('')
  const [age_restriction, setAge_restriction] = useState(0)
  const [duration, setDuration] = useState(0)
  const [district, setDistrict] = useState('')
  const [format, setFormat] = useState('')
  const [language, setLanguage] = useState('')
  const [organizer, setOrganizer] = useState('')

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

  const uploadBackground = async (file : File) => {
    const formData = new FormData()

    formData.append('backgroundImage', file)

    const response = await fetch(`${apiUrl}/uploads/background`, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    return data.imageUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.id) {
      toast("Необходимо авторизоваться для создания события.");
      return;
    }

    let backgroundUrl = background

    if (file) {
      try {
        backgroundUrl = await uploadBackground(file)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
        toast.error(
          <div>
            <strong>Ошибка загрузки фонового изображения</strong>
            <p>{errorMessage}</p>
          </div>,
          { // Опции тоста
            autoClose: 3000, // Закрыть через 5 секунд
          }
        );
        toast('Не удалось загрузить фоновое изображение!');
        return;
      }
    }

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
  }

    try {
      const createdEvent = await dispatch(createEvent(eventData)).unwrap()
      await dispatch(addToFavorites({ eventId: createdEvent.id, userId: user.id }))
      toast.success('Событие успешно создано!')
      navigate('/')
    } catch (error) {
      console.error("Ошибка при создании события:", error);
      toast.error("Произошла ошибка при создании события.");
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
          <label>Район города:</label>
          <input
            type='text'
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Дата начала события:</label>
          <input
            type='date'
            value={start_date}
            onChange={(e) => setStart_date(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Дата окончания события:</label>
          <input
            type='date'
            value={end_date}
            onChange={(e) => setEnd_date(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Максимальное количество человек:</label>
          <input
            type='text'
            value={maxPeople}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value.replace(/[^0-9]/g, '');
              setMaxPeople(numericValue ? Number(numericValue) : 0);
            }}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Цена билета ₽:</label>
          <input
            type='text'
            value={price}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value.replace(/[^0-9]/g, '');
              setPrice(numericValue ? Number(numericValue) : 0);
            }}
    required
  />
</div>
<div className={`${styles.formGroup} ${styles.eventType}`}>
      <label>Тип события:</label>
      <select
        name="eventType"
        value={event_type}
        onChange={handleSelectChange}
        required
      >
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
    </div>
<div className={styles.formGroup}>
  <label>Возрастное ограничение:</label>
  <input
    type="text"
    value={age_restriction}
    onChange={(e) => {
      const value = e.target.value;
      const numericValue = value.replace(/[^0-9]/g, '');
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
      const numericValue = value.replace(/[^0-9]/g, '');
      setDuration(numericValue ? Number(numericValue) : 0);
    }}
    required
  />
</div>
        <div className={styles.formGroup}>
  <label>Формат (Онлайн/оффлайн):</label>
  <select
    value={format}
    onChange={(e) => setFormat(e.target.value)}
    required
  >
    <option value="">Выберите формат</option>
    <option value="Онлайн">Онлайн</option>
    <option value="Оффлайн">Оффлайн</option>
  </select>
</div>
<div className={styles.formGroup}>
  <label>Язык события:</label>
  <select
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
    required
  >
    <option value="">Выберите язык</option>
    <option value="Русский">Русский</option>
    <option value="Английский">Английский</option>
    <option value="Немецкий">Немецкий</option>
    <option value="Французский">Французский</option>
    <option value="Испанский">Испанский</option>
    <option value="Китайский">Китайский</option>
  </select>
</div>
        {/* <div className={styles.formGroup}>
          <label>Доступность для людей с ОВЗ:</label>
          <input
            type='checkbox'
            value={accessibility}
            onChange={(e) => setAccessibility(e.target.value)}
            required
          />
        </div> */}
        <div className={styles.formGroup}>
          <label>Организация(Если есть):</label>
          <input
            type='text'
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}

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
          <label>Фоновое изображение:</label>
          <input
            type='file'
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
