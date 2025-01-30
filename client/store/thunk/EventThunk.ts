import {  createAsyncThunk } from '@reduxjs/toolkit';
import{ Event  } from '../../interface/EventFetch'

export const fetchEvents = createAsyncThunk<Event[]>(
    'events/fetchEvents',
    async () => {
      const response = await fetch('http://localhost:3000/events'); 
      const data = await response.json();
      return data; 
    }
  );