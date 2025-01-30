import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { SearchState, Event } from '../../interface/EventFetch';
import {  fetchSearch } from '../thunk/SearchThunk';

const initialState: SearchState = {
    events: [],
    loading: false,
    error: null,
    filters: {
      city: '',
      date: '',
      title: '',
    },
  };

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
      setCity: (state,  action: PayloadAction<string>) => {
        state.filters.city = action.payload;
      },
      setDate: (state, action: PayloadAction<string>) => {
        state.filters.date = action.payload;
      },
      setTitle: (state, action: PayloadAction<string>) => {
        state.filters.title = action.payload;
      },
      resetFilters: (state) => {
        state.filters = {
          city: '',
          date: '',
          title: '',
        }; 
      },
    },
    
    extraReducers: (builder) => {
      builder
        .addCase(fetchSearch.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchSearch.fulfilled, (state, action: PayloadAction<Event[]>) => {
            state.loading = false;
            state.events = action.payload; 
          })
        .addCase(fetchSearch.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
 
  export const { setCity, setDate, setTitle, resetFilters } = searchSlice.actions;
  export default searchSlice.reducer;