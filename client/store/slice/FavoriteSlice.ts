import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFavorites, addToFavorites, removeFromFavorites } from "../thunk/FavoriteThunk";


interface Event {
  id: number;
  title: string;
  description: string;
  city: string;
  date: string;
  userId: number;
  imageUrl?: string;
  background?: string | null;
  requirements?: string | null;
  createdAt: string;
  updatedAt: string;
}


interface Favorite {
  id: number;
  userId: number;
  eventId: number;
  createdAt: string;
  updatedAt: string;
  Event: Event; 
}

interface FavoriteState {
  favorites: Favorite[]; 
  loading: boolean;
}

const initialState: FavoriteState = {
  favorites: [],
  loading: false,
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload; 
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites.push(action.payload); 
      })
      .addCase(removeFromFavorites.fulfilled, (state, action: PayloadAction<{ userId: number; eventId: number }>) => {
        state.favorites = state.favorites.filter((fav) => fav.eventId !== action.payload.eventId); 
      });
  },
});

export default favoriteSlice.reducer;