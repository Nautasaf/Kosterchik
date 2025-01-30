import { createAsyncThunk } from '@reduxjs/toolkit';
import {  Event } from '../../interface/EventFetch';

export const fetchSearch= createAsyncThunk<Event[], { city: string; date: string; title: string }>(
  'search/fetchEvents',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(filters),
      });

    
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }

      
      const data = await response.json();
     
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);