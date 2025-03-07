import { useState, useEffect } from 'react'
import styles from './Search.module.scss'
import { updateFilters } from '../store/slice/SearchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/Index'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React from 'react'
import { format, parse } from 'date-fns'

interface SearchProps {
  isDarkMode: boolean
}

export const Search: React.FC<SearchProps> = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const dispatch = useDispatch<AppDispatch>()
  const filters = useSelector((state: RootState) => state.search.filters)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else if (currentScrollY < 150) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFilters({ city: event.target.value }))
  }

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd')
      dispatch(updateFilters({ date: formattedDate }))
    } else {
      dispatch(updateFilters({ date: null }))
    }
  }

  const parsedDate = filters.date
    ? parse(filters.date, 'yyyy-MM-dd', new Date())
    : null

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFilters({ title: event.target.value }))
  }

  return (
    <div
      className={`${styles.searchContainer} ${
        isVisible ? styles.visible : styles.hidden
      } ${isDarkMode ? styles.darkMode : styles.lightMode}`}
    >
      <input
        type='text'
        placeholder='Введите город'
        value={filters.city}
        onChange={handleCityChange}
        className={`${styles.searchInput} ${
          isDarkMode ? styles.darkModeInput : styles.lightModeInput
        }`}
      />
      <input
        type='text'
        value={filters.title}
        placeholder='Введите событие'
        onChange={handleTitleChange}
        className={`${styles.searchInput} ${
          isDarkMode ? styles.darkModeInput : styles.lightModeInput
        }`}
      />

      <DatePicker
        selected={parsedDate || null}
        onChange={handleDateChange}
        dateFormat='dd-MM-yyyy'
        placeholderText='Выберите день и месяц'
        className={styles.searchInput}
      />
    </div>
  )
}
