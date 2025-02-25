import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/Index";
import { fetchFavorites, removeFromFavorites } from "../store/thunk/FavoriteThunk";
import styles from "./FavoritesPage.module.scss";
import { useNavigate } from "react-router-dom";


export const HistoryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = userData.id;

  const handleNavigateToEvent = (id: number) => () => {
    if (id) {
      navigate(`/event/${id}`);
    } else {
      console.error('Invalid event ID');
    }
  };

  const { favorites} = useSelector((state: RootState) => state.Favorites);

  useEffect(() => {
    dispatch(fetchFavorites(userId));
  }, [dispatch, userId]);

  const handleRemoveFavorite = (eventId: number) => {
    dispatch(removeFromFavorites({ userId, eventId })).then(() => {
      dispatch(fetchFavorites(userId));
    });
  };

  const filteredFavorites = favorites.filter(fav => fav.userId === userId);

  return (
    <div className={styles["favorites-page"]}>
      <h1>История событий:</h1>

      <section>
      <ul>
  {filteredFavorites.length > 0 ? (
    filteredFavorites.map((favorite) => (
      <li key={favorite.eventId} className={styles["favorite-item"]} onClick={handleNavigateToEvent(favorite.eventId)}>
        <h3>{favorite.Event?.title || "Без названия"}</h3>
        <p>{favorite.Event?.description}</p>
        <p>{favorite.Event?.city}</p>
        <p>{favorite.Event?.date}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFavorite(favorite.eventId);
          }}
        >
          Удалить
        </button>
      </li>
    ))
  ) : (
    <p>У вас нет избранных событий.</p>
  )}
</ul>
      </section>
    </div>
  );
};