import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../store/Index'
import {
  fetchFavorites,
  removeFromFavorites,
} from '../store/thunk/FavoriteThunk'
import styles from './FavoritesPage.module.scss'
import { fetchUserEvents } from '../store/thunk/UserEventThunk'

export const HistoryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userData = JSON.parse(localStorage.getItem('user') || '{}')
  const userId = userData.id
  const meEvents = useSelector((state: RootState) => state.UserEvent.events)
  const favorites = useSelector((state: RootState) => state.Favorites.favorites)

  console.log('Тип favorites:', typeof favorites, 'Значение:', favorites)

  useEffect(() => {
    dispatch(fetchFavorites(userId))
  }, [dispatch, userId])

  useEffect(() => {
    dispatch(fetchUserEvents(userId))
  }, [dispatch, userId])

  const handleRemoveFavorite = async (userId: number, eventId: number) => {
    await dispatch(removeFromFavorites({ userId, eventId }))
    dispatch(fetchFavorites(userId))
    dispatch(fetchUserEvents(userId))
  }
  return (
    <div className={styles['favorites-page']}>
      <h1>История событии</h1>
      <h3>мои события: </h3>
      {meEvents.length > 0 ? (
        <ul>
          {meEvents.map((event) => (
            <li key={event.id} className={styles['event-item']}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{event.city}</p>
              <p>{event.date}</p>
              <button>Удалить событие</button>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles['no-event']}>У вас нет избранных событий.</div>
      )}

      {favorites.length > 0 ? (
        <ul>
          <h3>События, на которые я подписан: </h3>
          {favorites.map((favorite) => {
            return (
              <li key={favorite.Event.id} className={styles['favorite-item']}>
                <h3>{favorite.Event.title}</h3>
                <p>{favorite.Event.description}</p>
                <p>{favorite.Event.city}</p>
                <p>{favorite.Event.date}</p>
                <button
                  onClick={() =>
                    handleRemoveFavorite(favorite.userId, favorite.Event.id)
                  }
                >
                  Удалить событие
                </button>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className={styles['no-favorites']}>
          У вас нет избранных событий.
        </div>
      )}
    </div>
  )
}
