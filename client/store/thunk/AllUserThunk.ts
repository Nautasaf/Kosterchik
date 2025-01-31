import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (userId?: number) => {
    const url = `http://localhost:3000/users/${userId}` 

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке пользователей');
    }
    return response.json();
  }
);