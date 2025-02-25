import { createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (userId?: number) => {
    const url = `${apiUrl}/users/${userId}` 

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке пользователей');
    }
    return response.json();
  }
);