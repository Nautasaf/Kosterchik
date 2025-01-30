import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, resetForm } from '../store/slice/LoginSlice';
import { AppDispatch, RootState } from '../store/Index';
import style from './Login.module.scss';
import { loginUser } from '../store/thunk/LoginThunk';

export const Login: React.FC = () => {
  const { email, password } = useSelector((state: RootState) => state.Login);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();


    if (!email || !password) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      const response = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(response)) {
        alert('Вход выполнен успешно!');
        dispatch(resetForm()); 
        navigate('/');
      } else {
        const errorMessage = response.payload?.message || 'Ошибка входа';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при входе. Пожалуйста, попробуйте снова.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        dispatch(setEmail(value));
        break;
      case 'password':
        dispatch(setPassword(value));
        break;
      default:
        break;
    }
  };

  return (
    <form className={style.loginForm} onSubmit={submitHandler}>
      <h2 className={style.formTitle}>Вход</h2>
      <div className={style.formGroup}>
        <label htmlFor="email" className={style.formLabel}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          className={style.formInput}
          required
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor="password" className={style.formLabel}>
          Пароль:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          className={style.formInput}
          required
        />
      </div>
      <button type="submit" className={style.formButton}>
        Войти
      </button>
    </form>
  );
};

