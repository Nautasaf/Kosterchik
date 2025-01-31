import { createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from '../slice/AuthSlice';

const apiUrl = import.meta.env.VITE_API_URL;
console.log(`API URL is ${apiUrl}`);

export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logoutThunk',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        return rejectWithValue('Ошибка при выходе');
      }

      dispatch(logout());
      
      return;
    } catch (error) {
        console.error(error);
      return rejectWithValue('Произошла ошибка при выходе');
    }
  }
);