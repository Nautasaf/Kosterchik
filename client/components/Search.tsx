import { useState, useEffect } from 'react'
import styles from './Search.module.scss'
import { setCity, setDate, setTitle } from '../store/slice/SearchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/Index'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const Search: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const dispatch = useDispatch<AppDispatch>()
  const { city, date, title } = useSelector(
    (state: RootState) => state.search.filters,
  )

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        // Если скроллим вниз, скрываем блок
        setIsVisible(false)
      } else if (currentScrollY < 150) {
        // Если прокручиваем вверх и почти достигли верха (например, 150px от верха), показываем блок
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCity(event.target.value))
  }

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = `${date.getDate()}-${date.getMonth() + 1}`
      dispatch(setDate(formattedDate))
    }
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(event.target.value))
  }

  return (
    <div
      className={`${styles.searchContainer} ${
        isVisible ? styles.visible : styles.hidden
      }`}
    >
      <input
        type='text'
        placeholder='Введите город'
        value={city}
        onChange={handleCityChange}
        className={styles.searchInput}
      />
      <input
        type='text'
        value={title}
        placeholder='Введите событие'
        onChange={handleTitleChange}
        className={styles.searchInput}
      />

      <DatePicker
        selected={
          date
            ? new Date(
                `${new Date().getFullYear()}-${date.split('-')[1]}-${
                  date.split('-')[0]
                }`,
              )
            : null
        }
        onChange={handleDateChange}
        dateFormat='dd-MM'
        placeholderText='Выберите день и месяц'
        className={styles.searchInput}
        popperPlacement='bottom'
      />
    </div>
  )
}
