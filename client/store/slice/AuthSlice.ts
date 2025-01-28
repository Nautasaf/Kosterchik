import { createSlice } from '@reduxjs/toolkit';
import{AuthState} from '../../interface/Registration'

const savedIsLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
const initialState: AuthState = {
  isLoggedIn: savedIsLoggedIn,
  user: null
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      sessionStorage.setItem('isLoggedIn', 'true');
     
     
    },
    logout: (state) => {
      state.isLoggedIn = false;
      sessionStorage.removeItem('isLoggedIn');
      
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;