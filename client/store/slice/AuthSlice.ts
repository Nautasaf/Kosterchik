import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  username: string;
  email: string;
  city?: string;
  photoUrl?: string;
  age?: number;
  gender?: string;
  phone?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  error: string | null;
}
const savedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const savedUser = localStorage.getItem('userss') ? JSON.parse(localStorage.getItem('userss')!) : null; 

const initialState: AuthState = {
  isLoggedIn: savedIsLoggedIn,
  user: savedUser?.username || null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userss', JSON.stringify(action.payload)); 
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userss');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;