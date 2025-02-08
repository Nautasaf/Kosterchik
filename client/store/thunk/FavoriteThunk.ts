import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;

// получение списка избранных событий
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId: number, { rejectWithValue }) => {
    try {
    
      const response = await fetch(`${apiUrl}/favorites/${userId}`);
      
      if (!response.ok) throw new Error("Ошибка при загрузке избранных");
      
      const data = await response.json();
     
      return data;
    } catch (error) {
      console.error("Ошибка при получении избранных:", error);
      return rejectWithValue(error.message);
    }
  }
);

// добавление события в избранное
export const addToFavorites = createAsyncThunk(
  "favorites/addToFavorites",
  async ({ userId, eventId }: { userId: number; eventId: number }, { dispatch, rejectWithValue }) => {
    try {
      
      
      const response = await fetch(`${apiUrl}/favorites/add-to-favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, eventId }),
      });

      if (!response.ok) throw new Error("Ошибка при добавлении в избранное");

      const data = await response.json();
      console.log("Добавлено в избранное:", data);

      dispatch(fetchFavorites(userId)); 

      return data;
    } catch (error) {
      console.error("Ошибка при добавлении в избранное:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Удаление события из избранного
export const removeFromFavorites = createAsyncThunk(
  "favorites/removeFromFavorites",
  async ({ userId, eventId }: { userId: number; eventId: number }, { rejectWithValue }) => {
    try {
      console.log(`Удаление из избранного: userId=${userId}, eventId=${eventId}`);
      
      const response = await fetch(`${apiUrl}/favorites/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, eventId }),
      });

      if (!response.ok) throw new Error("Ошибка при удалении из избранного");

      const data = await response.json();
      console.log("Удалено из избранного:", data);

     

      return { userId, eventId };
    } catch (error) {
      console.error("Ошибка при удалении из избранного:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Получение списка избранных событий
export const getAllFavorites = createAsyncThunk(
  "favorites/getAllFavorites",
  async () => {
    try {
      const response = await fetch(`${apiUrl}/favorites`);
      
      if (!response.ok) throw new Error("Ошибка при загрузке избранных");
      
      const data = await response.json();      
      return data;
    } catch (error) {
      console.error("Ошибка при получении всех фаворитов:", error);
    }
  }
);

