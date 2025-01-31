import {  createAsyncThunk } from '@reduxjs/toolkit';
import{ Event  } from '../../interface/EventFetch'

const apiUrl = import.meta.env.VITE_API_URL;
console.log(`API URL is ${apiUrl}`);

export const fetchEvents = createAsyncThunk<Event[]>(
    'events/fetchEvents',
    async () => {
      const response = await fetch(`${apiUrl}/events`); 
      const data = await response.json();
      return data; 
    }
  );