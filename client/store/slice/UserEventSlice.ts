import { createSlice } from '@reduxjs/toolkit';
import { fetchUserEvents } from '../thunk/UserEventThunk';

export interface UserEvent {
  id: number;
  title: string;
  description: string;
  city: string;
  date: string;
  userId: number;
  eventId: number;
  imageUrl: string;
  background: string;
  requirements: string;
}


interface UserEventsState {
events: UserEvent[]; 
  loading: boolean;
  error: string | null;
}


const initialState: UserEventsState = {
  events: [],
  loading: false,
  error: null,
};

  const userEventsSlice = createSlice({
    name: 'userEvents',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserEvents.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserEvents.fulfilled, (state, action) => {
          state.loading = false;
          state.events = action.payload;
        })
        .addCase(fetchUserEvents.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string || 'Произошла неизвестная ошибка';
        });
    },
  });
  

  export default userEventsSlice.reducer;