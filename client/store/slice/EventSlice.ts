import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;

interface Event {
  id: number
  title: string
  description: string
  city: string
  date: string
  userId: number
  imageUrl: string
  background: string
  requirements: string
}

interface EventState {
  events: Event[]
  loading: boolean
  error: string | null
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
}

// Асинхронный thunk для создания события
export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData: Omit<Event, 'id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/events`,
        eventData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )
      return response.data
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(
          error || 'Ошибка при создании события',
        )
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        const typedError = error as { message: string };
        console.error(`Ошибка API: ${typedError.message}`);
      } else {
        console.error('Произошла неизвестная ошибка');
      }
    }
  },
)

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = false
        state.events.push(action.payload)
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default eventSlice.reducer
