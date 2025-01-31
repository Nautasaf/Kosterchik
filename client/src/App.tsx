import React, { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import styles from './App.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Index';
import { AppDispatch } from '../store/Index';
import { logoutThunk } from '../store/thunk/LogoutThunk';
import { Search } from '../components/Search';
import { setUser } from '../store/slice/UserSlice'
import { resetFilters } from '../store/slice/SearchSlice';
function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { isLoggedIn } = useSelector((state: RootState) => state.Auth)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      dispatch(setUser(user)) // Восстанавливаем данные пользователя
    }
  }, [dispatch, isLoggedIn])

  const handleLogout = () => {
    dispatch(logoutThunk())
  }

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleResetFilters = () => {
    dispatch(resetFilters()); 
  };

  return (
    <div
      className={`${styles.appContainer} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <nav className={styles.navMenu}>
        {isLoggedIn ? (
          <>
            <NavLink
              to='/'
              end
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''} ${isDarkMode ? styles.darkMode : styles.lightMode}`}
              onClick={handleResetFilters} 
            >
              Костерчик
            </NavLink>
            <button
              onClick={toggleTheme}
              className={`${styles.navLink} ${
                isDarkMode ? styles.darkMode : styles.lightMode
              }`}
            >
              Переключить тему
            </button>

            <NavLink
              to='/profile'
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''} ${
                  isDarkMode ? styles.darkMode : styles.lightMode
                }`
              }
            >
              Профиль
            </NavLink>

            <button
              onClick={handleLogout}
              className={`${styles.navLink} ${
                isDarkMode ? styles.darkMode : styles.lightMode
              }`}
            >
              Выйти
            </button>
          </>
        ) : (
          <>
            <NavLink
              to='/'
              end
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''} ${isDarkMode ? styles.darkMode : styles.lightMode}`}
              onClick={handleResetFilters}  
            >
              Костерчик
            </NavLink>
            <button
              onClick={toggleTheme}
              className={`${styles.navLink} ${
                isDarkMode ? styles.darkMode : styles.lightMode
              }`}
            >
              Переключить тему
            </button>

            <NavLink
              to='/registration'
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''} ${
                  isDarkMode ? styles.darkMode : styles.lightMode
                }`
              }
            >
              Регистрация
            </NavLink>

            <NavLink
              to='/login'
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''} ${
                  isDarkMode ? styles.darkMode : styles.lightMode
                }`
              }
            >
              Логин
            </NavLink>
          </>
        )}
      </nav>
      
      {isLoggedIn && <Search />}
      {!isLoggedIn && <h1>Добро пожаловать в пикничОК!!!</h1>}

      <div className={styles.outletContainer}>
        <Outlet />
      </div>

     


      <footer className={styles.footer}>
        контакты: + 7(929)-198-88-32
        <br />
        адрес: г. Уфа, ул. Салавата Юлаева д.90
      </footer>
    </div>
  )
}

export default App;

