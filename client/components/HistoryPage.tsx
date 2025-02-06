import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/Index";
import { fetchFavorites,  removeFromFavorites } from "../store/thunk/FavoriteThunk";
import { fetchUserEvents } from "../store/thunk/UserEventThunk"; 
import styles from "./FavoritesPage.module.scss";

export const HistoryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = userData.id;
  const { favorites, loading: favoritesLoading } = useSelector((state: RootState) => state.Favorites);
  const { events: userEvents, loading: userEventsLoading } = useSelector((state: RootState) => state.UserEvent);
  console.log(favorites);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavorites(userId));
      dispatch(fetchUserEvents(userId));
    }
  }, [dispatch, userId]);

  const handleRemoveFavorite = (eventId: number) => {
    dispatch(removeFromFavorites({ userId, eventId })).then(() => {
      dispatch(fetchFavorites(userId)); // Перезагружаем избранные после удаления
    });
  };

  return (
    <div className={styles["favorites-page"]}>
      <h1>История событий</h1>

      <section>
        <h2>Мои события</h2>
        {userEventsLoading ? (
          <p>Загрузка...</p>
        ) : userEvents.length > 0 ? (
          <ul>
            {userEvents.map((event) => (
              <li key={event.id} className={styles["event-item"]}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>{event.city}</p>
                <p>{event.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>У вас нет истории событий.</p>
        )}
      </section>

      <section>
        <h2>Избранные события</h2>
        {favoritesLoading ? (
          <p>Загрузка...</p>
        ) : favorites.length > 0 ? (
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite.eventId} className={styles["favorite-item"]}>
                <h3>{favorite.Event?.title || "Без названия"}</h3>
                <p>{favorite.Event.description}</p>
                <p>{favorite.Event?.city}</p>
                <p>{favorite.Event?.date}</p>
                <button onClick={() => handleRemoveFavorite(favorite.eventId)}>Удалить</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>У вас нет избранных событий.</p>
        )}
      </section>
    </div>
  );
};