import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// RootState здесь не используется, можно убрать

const apiUrl = import.meta.env.VITE_API_URL;

interface Event {
  longitude: any;
  latitude: any;
  id: number ;
  title: string;
  description: string;
  city: string;
  date?: string;
  start_date: string;
  end_date: string;
  userId: number;
  maxPeople: number | undefined
  createdAt?: string;
  updatedAt?: string;
  imageUrl?: string;
  background?: string;
  requirements?: string;
  price?: number;
  event_type?: string;
  age_restriction?: number;
  duration?: number;
  district?: string;
  format?: string;
  available_seats?: number;
  language?: string;
  accessibility?: boolean;
  rating?: number;
  organizer?: string;
  popularity?: number;
}

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
};

// Thunk для создания события
export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData: Omit<Event, 'id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/events`, eventData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка при создании события');
    }
  },
);

// Thunk для редактирования события
export const editEvent = createAsyncThunk(
  'events/editEvent',
  async ({ eventId, updatedData }: { eventId: number; updatedData: Partial<Event> }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiUrl}/events/${eventId}`, updatedData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка при редактировании события');
    }
  },
);

// Thunk для удаления события
export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${apiUrl}/events/${eventId}`, {
        withCredentials: true,
      });
      return eventId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка при удалении события');
    }
  },
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Создание события
    builder.addCase(createEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createEvent.fulfilled, (state, action: PayloadAction<Event>) => {
      state.loading = false;
      state.events.push(action.payload);
    });
    builder.addCase(createEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Редактирование события
    builder.addCase(editEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editEvent.fulfilled, (state, action: PayloadAction<Event>) => {
      state.loading = false;
      const index = state.events.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    });
    builder.addCase(editEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Удаление события
    builder.addCase(deleteEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteEvent.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.events = state.events.filter((event) => event.id !== action.payload);
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default eventSlice.reducer;