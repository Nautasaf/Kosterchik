import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {LoginState, RegisterUserError } from '../../interface/Registration';
import { loginUser } from '../thunk/LoginThunk';


const initialState: LoginState = {
  username: '',
  email: '',
  password: '',
  city: '',
  photoUrl: '',
  error: null,
  isLoggedIn: false,
};

const LoginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    resetForm: (state) => {
      state.email = '';
      state.password = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<RegisterUserError | undefined>) => {
          state.error = action.payload ?? { message: 'Неизвестная ошибка' };
      });
  },
});

export const {
  setEmail,
  setPassword,
  setCity,
  resetForm,
} = LoginSlice.actions;

export default LoginSlice.reducer;