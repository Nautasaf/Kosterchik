import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
  setCity,
} from '../store/slice/RegistrationSlice'
import type { AppDispatch, RootState } from '../store/Index'
import style from './Registration.module.scss'
import React from 'react'
import { registerUser } from '../store/thunk/RegistrationThunk'

export const Registration: React.FC = () => {
  const { username, email, password, confirmPassword, city } = useSelector(
    (state: RootState) => state.Registration,
  )

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Пароли не совпадают!')
      return
    }

    try {
      const response = await dispatch(
        registerUser({ username, email, password, city }),
      )

      if (registerUser.fulfilled.match(response)) {
        alert('Регистрация успешна!')
        navigate('/login')
      } else if (registerUser.rejected.match(response)) {
        const errorMessage = response.payload?.message || 'Ошибка регистрации'
        alert(errorMessage)
        console.log(errorMessage)
      }
    } catch (error) {
      console.error('Ошибка:', error)
      alert('Ошибка при отправке запроса. Попробуйте снова.')
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    switch (name) {
      case 'username':
        dispatch(setUsername(value))
        break
      case 'email':
        dispatch(setEmail(value))
        break
      case 'password':
        dispatch(setPassword(value))
        break
      case 'confirmPassword':
        dispatch(setConfirmPassword(value))
        break
      case 'city':
        dispatch(setCity(value))
        break
      default:
        break
    }
  }

  return (
    <form className={style.registrationForm} onSubmit={submitHandler}>
      <h2 className={style.formTitle}>Регистрация</h2>
      <div className={style.formGroup}>
        <label htmlFor='username' className={style.formLabel}>
          Имя пользователя:
        </label>
        <input
          type='text'
          id='username'
          name='username'
          value={username}
          onChange={handleInputChange}
          className={style.formInput}
          required
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor='email' className={style.formLabel}>
          Email:
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={handleInputChange}
          className={style.formInput}
          required
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor='password' className={style.formLabel}>
          Пароль:
        </label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={handleInputChange}
          className={style.formInput}
          required
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor='confirmPassword' className={style.formLabel}>
          Повторите пароль:
        </label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleInputChange}
          className={style.formInput}
          required
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor='city' className={style.formLabel}>
          Город:
        </label>
        <input
          type='text'
          id='city'
          name='city'
          value={city}
          onChange={handleInputChange}
          className={style.formInput}
          required
        />
      </div>
      <button type='submit' className={style.formButton}>
        Зарегистрироваться
      </button>
    </form>
  )
}
