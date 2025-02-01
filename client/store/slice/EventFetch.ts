import { createSlice} from '@reduxjs/toolkit';
import { fetchEvents } from '../thunk/EventThunk';
import{EventsState} from '../../interface/EventFetch'

const initialState: EventsState = {
    events: [],
    loading: false,
    error: null,
  };


const eventsSlice = createSlice({
    name: 'Events',
    initialState ,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchEvents.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchEvents.fulfilled, (state, action) => {
          state.loading = false;
          state.events = action.payload;
        })
        .addCase(fetchEvents.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message  || 'Ошибка при загрузке событий';; 
        });
    },
  });
  

  export default eventsSlice.reducer;