import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  error: string | null;
}

const savedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const savedUser = localStorage.getItem('userss') ? JSON.parse(localStorage.getItem('userss')!) : null; 

const initialState: AuthState = {
  isLoggedIn: savedIsLoggedIn,
  username: savedUser?.username || null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string }>) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.error = null;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userss', JSON.stringify(action.payload)); 
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
      state.error = null;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userss');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;