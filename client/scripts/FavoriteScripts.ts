import { Favorite } from "../interface/EventFetch";

  // Функция для получения количества уже участвующих
  export const handleCountFavorites = (eventId : number, allFavorites: Favorite[]) => {
    const copyFav = JSON.parse(JSON.stringify(allFavorites));
    const favCounter : number = copyFav.filter((fav : Favorite) => fav.eventId === eventId).length;
    return favCounter
  }

  // Функция для проверки, участвует ли пользователь в событии
  export const handleUserAlreadyAddedToFavorites = (eventId: number, userId: number, allFavorites: Favorite[]): boolean => {
    return allFavorites.some((fav) => fav.eventId === eventId && fav.userId === userId);
  };