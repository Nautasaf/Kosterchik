import React, { useRef } from 'react'
import axios from 'axios'
import styles from './ProfilePhoto.module.scss'
import { setUser } from '../../store/slice/UserSlice'
import { useDispatch } from 'react-redux'

interface ProfilePhotoProps {
  photoUrl: string
  altText: string
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ photoUrl, altText }) => {
  const dispatch = useDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault()
    const file = event.target.files?.[0]

    if (!file) {
      alert('Пожалуйста, выберите файл')
      return
    }

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const response = await axios.put(
        'http://localhost:3000/profile/photo',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        },
      )

      const user = response.data

      dispatch(setUser(user))
    } catch (error) {
      console.error('Ошибка:', error)
      alert(`Произошла ошибка при загрузке файла: ${error.message}`)
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className={styles.blockPhoto}>
      {photoUrl ? (
        <img
          src={`http://localhost:3000${photoUrl}`}
          alt={altText}
          className={styles.blockPhotoImg}
        />
      ) : (
        <span className={styles.blockPhotoSpan} onClick={handleButtonClick}>
          Добавить фото
        </span>
      )}
      <input
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        className={styles.hiddenInput}
        ref={fileInputRef}
      />
    </div>
  )
}

export default ProfilePhoto
