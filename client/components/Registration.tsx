import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
  setCity,
  setAge,
  setGender,
  setPhone,
  resetForm,
} from '../store/slice/RegistrationSlice'
import type { AppDispatch, RootState } from '../store/Index'
import style from './Registration.module.scss'
import React, { ChangeEvent } from 'react'
import { registerUser } from '../store/thunk/RegistrationThunk'
import { toast } from 'react-toastify'

export const Registration: React.FC = () => {
  const { username, email, password, confirmPassword, city, age, gender, phone } = useSelector(
    (state: RootState) => state.Registration,
  )

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Пароли не совпадают!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }
    try {
      const response = await dispatch(registerUser({ username, email, password, city, age, gender, phone }))

      if (registerUser.fulfilled.match(response)) {
        toast.success('Регистрация успешна!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        navigate('/login')
      } else if (registerUser.rejected.match(response)) {
        const errorMessage = response.payload?.message || 'Ошибка регистрации'
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        console.log(errorMessage)
      }
    } catch (error) {
      console.error('Ошибка:', error)
      toast.error('Ошибка при отправке запроса. Попробуйте снова.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleInputChange =  (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      case 'age':
        dispatch(setAge(value))
        break
      case 'gender':
        dispatch(setGender(value))
        break
      case 'phone':
        dispatch(setPhone(value))
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
      <div className={style.formGroup}>
        <label htmlFor='age' className={style.formLabel}>
          Возраст:
        </label>
        <input
          type='number'
          id='age'
          name='age'
          value={age}
          onChange={handleInputChange}
          className={style.formInput}
          required
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor='gender' className={style.formLabel}>
          Пол:
        </label>
        <select
          id='gender'
          name='gender'
          value={gender}
          onChange={handleInputChange}
          className={style.formInput}
          required
        >
          <option value=''>Выберите пол</option>
          <option value='male'>Мужской</option>
          <option value='female'>Женский</option>
        </select>
      </div>
      <div className={style.formGroup}>
        <label htmlFor='phone' className={style.formLabel}>
          Телефон:
        </label>
        <input
          type='tel'
          id='phone'
          name='phone'
          value={phone}
          onChange={handleInputChange}
          className={style.formInput}
         
        />
      </div>
      <button type='submit' className={style.formButton}>
        Зарегистрироваться
      </button>
    </form>
  )
}