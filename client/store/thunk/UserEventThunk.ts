import { createAsyncThunk } from '@reduxjs/toolkit';



export const fetchUserEvents = createAsyncThunk(
  "UserEvent/fetchUserEvents",
  async (userId: number, { rejectWithValue }) => {
    try {
     
      const response = await fetch(`http://localhost:3000/user-event/${userId}`);

      if (!response.ok) throw new Error("Failed to fetch user events");

      const data = await response.json();
    
      return data;
    } catch (error) {
      console.error("Error fetching user events:", error);
      return rejectWithValue(error.message);
    }
  }
);