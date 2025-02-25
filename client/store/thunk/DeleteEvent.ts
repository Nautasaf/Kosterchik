import { createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = import.meta.env.VITE_API_URL;

export const deleteEvent = createAsyncThunk<number, number, { rejectValue: string }>(
  'events/deleteEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      return eventId; // Возвращаем ID удалённого события
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
  }
);