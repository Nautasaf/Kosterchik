import { createAsyncThunk } from '@reduxjs/toolkit';


  export const addToFavorites = createAsyncThunk(
    'favorites/addToFavorites',
    async ({ eventId, userId }: { eventId: number, userId: number }, { rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:3000/favorites/add-to-favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, eventId }),
        });
  
        if (!response.ok) {
          throw new Error('Ошибка при добавлении в избранное');
        }
  
        const data = await response.json();
      
        
        return data; 
      } catch (error) {
        return rejectWithValue(error.message); 
      }
    }
  );

  export const removeFromFavorites = createAsyncThunk(
    'favorites/removeFromFavorites',
    async ({ userId, eventId }: { userId: number; eventId: number }, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:3000/favorites/remove`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, eventId }),
        });
  
        if (!response.ok) {
          throw new Error('Ошибка при удалении из избранного');
        }
  
        return eventId; 
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

  export const fetchFavorites = createAsyncThunk(
    'favorites/fetchFavorites',
    async (userId: number, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:3000/favorites/${userId}`);
  
        if (!response.ok) {
          throw new Error('Ошибка при получении избранных событий');
        }
  
        const data = await response.json();
        return data; 
       
        
      } catch (error) {
        return rejectWithValue(error.message); 
      }
    }
  );