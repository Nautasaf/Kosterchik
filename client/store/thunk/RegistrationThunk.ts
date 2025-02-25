import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  RegisterUserResponse,
  RegisterUserError,
} from '../../interface/Registration'

const apiUrl = import.meta.env.VITE_API_URL;

export const registerUser = createAsyncThunk<
  RegisterUserResponse,
  { username: string; email: string; password: string; city: string; age: string; gender: string; phone: string },
  { rejectValue: RegisterUserError }
>('registration/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiUrl}/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return rejectWithValue({
        message: errorData.text || 'Ошибка регистрации',
      })
    }

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Ошибка при логине:', error)
    return rejectWithValue({ message: 'Ошибка при отправке запроса' })
  }
})
