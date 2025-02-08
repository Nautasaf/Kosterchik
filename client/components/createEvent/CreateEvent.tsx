import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Index";
import { useNavigate } from "react-router-dom";
import styles from "./CreateEvent.module.scss";
import { createEvent } from "../../store/slice/EventSlice";
import { AppDispatch } from "../../store/Index";
import MapPicker from "../MapPicker";

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
  const [file, setFile] = useState<File | null>(null)
  const [maxPeople, setMaxPeople] = useState(0)
  const [start_date, setStart_date] = useState('')
  const [end_date, setEnd_date] = useState('')
  const [price, setPrice] = useState(0)
  const [event_type, setEvent_type] = useState('')
  const [age_restriction, setAge_registration] = useState(0)
  const [duration, setDuration] = useState(0)
  const [district, setDistrict] = useState('')
  const [format, setFormat] = useState('')
  const [language, setLanguage] = useState('')
  // const [accessibility, setAccessibility] = useState(false)
  const [organizer, setOrganizer] = useState('')

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
      alert("Необходимо авторизоваться для создания события.");
      return;
    }

    let backgroundUrl = background

    if (file) {
      try {
        backgroundUrl = await uploadBackground(file)
      } catch (error) {
        console.error('Ошибка загрузки фонового изображения', error)
        alert('Не удалось загрузить фоновое изображение!')
        return
      }
    }

  //   const formData = new FormData()
  //   formData.append('title', title)
  //   formData.append('description', description)
  //   formData.append('city', city)
  //   formData.append('date', date)
  //   formData.append('userId', user.id.toString())
  //   formData.append('imageUrl', user.photoUrl)
  //   formData.append('requirements', requirements)
    
  //   maxPeople: number
  // start_date: string
  // end_date: string
  // price: number
  // event_type: string
  // age_restriction: number
  // duration: number
  // district: string
  // format: string
  // language: string
  // accessibility: boolean
  // organizer: string
  //   formData.append('maxPeople', maxPeople)
  //   formData.append('start_date', start_date)
  //   formData.append('city', city)
  //   formData.append('city', city)
  //   formData.append('city', city)
  //   formData.append('city', city)
  //   formData.append('city', city)
  //   formData.append('city', city)

  //   formData.append('background', backgroundUrl)// Загружаем файл
  //   formData.append('latitude', String(location.lat)) 
  //   formData.append('longitude', String(location.lng)) 

  //   console.log('Отправляемые данные:', Array.from(formData.entries())) // Проверяем данные перед отправкой

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
    
  }

    try {
      await dispatch(createEvent(eventData)).unwrap()
      alert('Событие успешно создано!')
      navigate('/')
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
          <label>Максимальное количество человек:</label>
          <input
            type='number'
            value={maxPeople}
            onChange={(e) => setMaxPeople(Number(e.target.value))}
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
          <label>Требования к участникам:</label>
          <input
            type='text'
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Цена билета:</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Тип события(Концерт, выставка и т.д.):</label>
          <input
            type='text'
            value={event_type}
            onChange={(e) => setEvent_type(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Возрастное ограничение:</label>
          <input
            type='number'
            value={age_restriction}
            onChange={(e) => setAge_registration(Number(e.target.value))}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Длительность:</label>
          <input
            type='number'
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
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
          <label>Формат(Онлайн/оффлайн):</label>
          <input
            type='text'
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Язык события:</label>
          <input
            type='text'
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
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
          <label>Фоновое изображение:</label>
          <input
            type='file'
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
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
