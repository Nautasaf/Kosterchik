import { createAsyncThunk } from '@reduxjs/toolkit'
import {RegisterUserResponse,RegisterUserError, User,} from '../../interface/Registration'
import { login } from '../slice/AuthSlice'

const apiUrl = import.meta.env.VITE_API_URL;

export const loginUser = createAsyncThunk<
 User,
  { email: string; password: string },
  { rejectValue: RegisterUserError }
>('login/loginUser',
   async (userData, { dispatch, rejectWithValue }) => {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return rejectWithValue({ message: errorData?.text || 'Ошибка логина' })
    }
    const { data }: RegisterUserResponse = await response.json()
    dispatch(login(data))

    return data
  } catch (error) {
    console.error('Ошибка при логине:', error)
    return rejectWithValue({
      message: 'Ошибка соединения или сервер недоступен',
    })
  }
})
