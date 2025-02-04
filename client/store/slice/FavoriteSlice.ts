import { createSlice,  } from '@reduxjs/toolkit';
import { addToFavorites, fetchFavorites, removeFromFavorites } from '../thunk/FavoriteThunk';


export interface Event {
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
  createdAt: string;
  updatedAt: string;
}

export interface FavoriteEvent {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  Event?: Event; 
}

interface FavoritesState {
  favorites: FavoriteEvent[] | [];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
    name: 'Favorites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addToFavorites.pending, (state) => {
          state.loading = true;
        })
        .addCase(addToFavorites.fulfilled, (state, action) => {
          state.loading = false;
          state.favorites = action.payload;
        })
        .addCase(addToFavorites.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string; 
        })
        
       
        .addCase(removeFromFavorites.pending, (state) => {
          state.loading = true;
        })
        .addCase(removeFromFavorites.fulfilled, (state, action) => {
          state.loading = false;
          state.favorites = state.favorites.filter((favorite) => favorite.id !== action.payload);
        })
        .addCase(removeFromFavorites.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string; 
        })
  
        
        .addCase(fetchFavorites.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchFavorites.fulfilled, (state, action) => {
          state.loading = false;
          state.favorites = action.payload; 
        })
        .addCase(fetchFavorites.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string; 
        });
    },
  });
  
  export default favoritesSlice.reducer;