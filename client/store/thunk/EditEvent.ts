import { createAsyncThunk } from '@reduxjs/toolkit';
import { Event } from '../../interface/EventFetch';

const apiUrl = import.meta.env.VITE_API_URL;

export const editEvent = createAsyncThunk<Event, { eventId: number; updatedData: Partial<Event> }, { rejectValue: string }>(
  'events/editEvent',
  async ({ eventId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
  }
);