import React from 'react'
import styles from './ProfilePage.module.scss'
import ProfilePhoto from '../profilePhoto/ProfilePhoto'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/Index.ts'

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  console.log(user)

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
        <button className={styles.button1}>История</button>
        <button className={styles.button2}>Предложить событие</button>
      </div>
    </div>
  )
}

export default ProfilePage
