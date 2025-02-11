import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import styles from './App.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../store/Index'
import { logoutThunk } from '../store/thunk/LogoutThunk'
import { Search } from '../components/Search'
import { setUser } from '../store/slice/UserSlice'
import { resetFilters } from '../store/slice/SearchSlice'
import { ToastContainer } from 'react-toastify'
import { HeaderBar } from '../components/HeaderPage'
import {
  IoExitOutline,
  IoMoon,
  IoSunny,
  IoPersonOutline,
  IoPersonAddOutline,
  IoLogInOutline,
} from 'react-icons/io5'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { isLoggedIn } = useSelector((state: RootState) => state.Auth)
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()

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
        <div className={styles.containerLogo}>
          <div className={styles.blockPhoto}>
            <img src='/camp-fire.png' alt='Логотип' className={styles.logo} />
          </div>
          <div className={styles.blockLogo}>
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
          </div>
        </div>

        {isLoggedIn ? (
          <div className={styles.userControls}>
            <button onClick={toggleTheme} className={styles.themeToggle}>
              {isDarkMode ? <IoSunny size={24} /> : <IoMoon size={24} />}
            </button>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              <IoPersonOutline size={24} />
            </NavLink>
            <button onClick={handleLogout} className={styles.logoutButton}>
              <IoExitOutline size={24} />
            </button>
          </div>
        ) : (
          <div className={styles.userControls}>
            <NavLink
              to='/registration'
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              <IoPersonAddOutline size={24} />
            </NavLink>
            <NavLink
              to='/login'
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              <IoLogInOutline size={24} />
            </NavLink>
          </div>
        )}
      </nav>
      {isLoggedIn && location.pathname === '/' && (
        <HeaderBar isDarkMode={isDarkMode} />
      )}
      {isLoggedIn && location.pathname === '/' && (
        <Search isDarkMode={isDarkMode} />
      )}

      <div className={styles.outletContainer}>
        <Outlet />
      </div>
      <ToastContainer />
      <footer className={styles.footer}>
        <div>
          Контакты: +7(929)-198-88-32
          <br />
          Адрес: г. Уфа, ул. Салавата Юлаева д.90
        </div>
        <div className={styles.footerLinks}>
          <NavLink to='/project' className={styles.footerLink}>
            О Проекте
          </NavLink>
          <br></br>
          <NavLink to='/developers' className={styles.footerLink}>
            Разработчики
          </NavLink>
        </div>
      </footer>
    </div>
  )
}

export default App
