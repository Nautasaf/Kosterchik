import { createAsyncThunk } from '@reduxjs/toolkit';



export const fetchUserEvents = createAsyncThunk(
  'userEvents/fetchUserEvents',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/events/user-event', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), 
      });

      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }

      const data = await response.json();
     


      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Произошла неизвестная ошибка');
    }
  }
);