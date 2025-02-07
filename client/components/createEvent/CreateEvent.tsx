import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/Index'
import { useNavigate } from 'react-router-dom'
import styles from './CreateEvent.module.scss'
import { createEvent } from '../../store/slice/EventSlice'
import { AppDispatch } from '../../store/Index'

interface IEventData {
  title: string
  description: string
  city: string
  date: string
  userId: number
  imageUrl: string
  background: string
  requirements: string
}

const CreateEvent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user)

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [city, setCity] = useState(user.city || '')
  const [description, setDescription] = useState('')
  const [requirements, setRequirements] = useState('')
  const [background, setBackground] = useState('#ffffff')
  const [file, setFile] = useState<File | null>(null)

  const uploadBackground = async (file) => {
    const formData = new FormData()

    formData.append('backgroundImage', file)

    const response = await fetch('http://localhost:3000/uploads/background', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    return data.imageUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user.id) {
      alert('Необходимо авторизоваться для создания события.')
      return
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

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('city', city)
    formData.append('date', date)
    formData.append('userId', user.id.toString())
    formData.append('imageUrl', user.photoUrl)
    formData.append('requirements', requirements)
    formData.append('background', backgroundUrl) // Загружаем файл

    console.log('Отправляемые данные:', Array.from(formData.entries())) // Проверяем данные перед отправкой

    try {
      await dispatch(createEvent(formData)).unwrap()
      alert('Событие успешно создано!')
      navigate('/')
    } catch (error) {
      console.error('Ошибка при создании события:', error)
      alert('Произошла ошибка при создании события.')
    }
  }
  return (
    <div className={styles.createEventContainer}>
      <h2>Создать событие</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Название события:</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Дата события:</label>
          <input
            type='date'
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
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Цвет фона карточки:</label>
          <input
            type='color'
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
        <button type='submit' className={styles.submitButton}>
          Создать событие
        </button>
      </form>
    </div>
  )
}

export default CreateEvent
