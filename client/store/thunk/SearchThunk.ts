import { createAsyncThunk } from '@reduxjs/toolkit'
import { Event } from '../../interface/EventFetch'

const apiUrl = import.meta.env.VITE_API_URL

export const fetchSearch = createAsyncThunk<
  Event[],
  { city: string; date: string; title: string }
>('search/fetchEvents', async (filters, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiUrl}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    })

    if (!response.ok) {
      throw new Error('Ошибка при получении данных')
    }

    const data = await response.json()

    return data
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    } else {
      alert('Произошла неизвестная ошибка')
    }
  }
})
