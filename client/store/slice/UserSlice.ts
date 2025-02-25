import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number | null;
  username: string;
  email: string;
  city: string;
  photoUrl: string;
}

const savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

const initialState: UserState = {
  id: savedUser?.id || null,
  username: savedUser?.username || '',
  email: savedUser?.email || '',
  city: savedUser?.city || '',
  photoUrl: savedUser?.photoUrl || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.city = action.payload.city;
      state.photoUrl = action.payload.photoUrl;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Сохраняем данные пользователя
    },
    clearUser: (state) => {
      state.id = null;
      state.username = '';
      state.email = '';
      state.city = '';
      state.photoUrl = '';
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;