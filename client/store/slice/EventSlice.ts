import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store/Index'

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
        'http://localhost:3000/events',
        eventData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Ошибка при создании события',
      )
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
