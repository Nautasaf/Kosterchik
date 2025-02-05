import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/Index';
import { fetchFavorites, removeFromFavorites } from '../store/thunk/FavoriteThunk';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = JSON.parse(localStorage.getItem('userss') || '{}');
  const userId = userData.id;
  const  favorites = useSelector(
    (state: RootState) => state.Favorites.favorites
  );

  useEffect(() => {
      dispatch(fetchFavorites(userId));
  }, [dispatch, userId]);

  const handleRemoveFavorite = (userId: number, eventId: number) => {
    dispatch(removeFromFavorites({ userId, eventId }));
  };

  return (
    <div className={styles['favorites-page']}>
      <h1>Мои избранные события</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((favorite) => (
            favorite.Event && (
              <li key={favorite.Event.id} className={styles['favorite-item']}>
                <h3>{favorite.Event.title}</h3>
                <p>{favorite.Event.description}</p>
                <button onClick={() => handleRemoveFavorite(userId, favorite.eventId)}>
                  Удалить событие
                </button>
              </li>
            )
          ))}
        </ul>
      ) : (
        <div className={styles['no-favorites']}>У вас нет избранных событий.</div>
      )}
    </div>
  );
  
};