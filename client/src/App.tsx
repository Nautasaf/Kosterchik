import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom' // Добавили useLocation
import styles from './App.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../store/Index'
import { logoutThunk } from '../store/thunk/LogoutThunk'
import { Search } from '../components/Search'
import { setUser } from '../store/slice/UserSlice'
import { resetFilters } from '../store/slice/SearchSlice'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HeaderBar } from '../components/HeaderPage'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { isLoggedIn } = useSelector((state: RootState) => state.Auth)
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation() // Получаем текущий маршрут

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      dispatch(setUser(user))
    }
  }, [dispatch, isLoggedIn])

  const handleLogout = () => {
    dispatch(logoutThunk())
  }

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  const handleResetFilters = () => {
    dispatch(resetFilters())
  }

  return (
    <div className={isDarkMode ? styles.darkMode : styles.lightMode}>
      <nav className={styles.navMenu}>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          Переключить тему
        </button>

        <NavLink
          to='/'
          end
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
          onClick={handleResetFilters}
        >
          К<span className={styles.highlightO}>О</span>стерчик
        </NavLink>

        {isLoggedIn ? (
          <>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              Профиль
            </NavLink>

            <button onClick={handleLogout} className={styles.logoutButton}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <NavLink
              to='/registration'
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              Регистрация
            </NavLink>

            <NavLink
              to='/login'
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              Логин
            </NavLink>
          </>
        )}
      </nav>
      {isLoggedIn && location.pathname === '/' && <HeaderBar/>}
      {/* Показываем Search только если мы НЕ на странице /profile */}
      {isLoggedIn && location.pathname === '/' && <Search />}

      <div className={styles.outletContainer}>
        <Outlet />
      </div>
      <ToastContainer />
      <footer className={styles.footer}>
        контакты: +7(929)-198-88-32
        <br />
        адрес: г. Уфа, ул. Салавата Юлаева д.90
      </footer>
    </div>
  )
}

export default App
