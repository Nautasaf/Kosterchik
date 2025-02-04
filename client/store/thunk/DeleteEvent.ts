export const deleteEvent = createAsyncThunk<number, number, { rejectValue: string }>(
  'events/deleteEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      return eventId; // Возвращаем ID удалённого события
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
  }
);