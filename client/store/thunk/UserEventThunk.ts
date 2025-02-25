import { createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = import.meta.env.VITE_API_URL;


export const fetchUserEvents = createAsyncThunk(
  "UserEvent/fetchUserEvents",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/events/user-event`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), 
      });

      if (!response.ok) throw new Error("Failed to fetch user events");

      const data = await response.json();
    
      return data;
    } catch (error) {
      // Проверяем, является ли ошибка экземпляром Error
      if (error instanceof Error) {
        console.error("Ошибка при получении событий:", error.message);
        return rejectWithValue(error.message);
      } else {
        console.error("Неизвестная ошибка:", error);
        return rejectWithValue("Произошла неизвестная ошибка");
      }
    }
  }
);