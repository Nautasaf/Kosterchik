import { createSlice } from '@reduxjs/toolkit';
import{AuthState} from '../../interface/Registration'

const savedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const initialState: AuthState = {
  isLoggedIn: savedIsLoggedIn,
  username: null, 
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      localStorage.setItem('isLoggedIn', 'true'); 
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;