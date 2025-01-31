import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RegisterUserError, RegistrationState } from '../../interface/Registration'
import { registerUser } from '../thunk/RegistrationThunk';

const initialState: RegistrationState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  city: '',
  error: null,
};

const RegistrationSlice = createSlice({
  name: 'Registration',
  initialState,
  reducers: {
    setUsername: (state,action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
        state.confirmPassword = action.payload;
      },
      setCity: (state, action: PayloadAction<string>) => {
        state.city = action.payload;
      },
      
    setError: (state, action: PayloadAction<RegisterUserError>) => {
      state.error = action.payload;
    },
    resetForm: (state) => {
      state.username = '';
      state.email = '';
      state.password = '';
      state.error = null;
      state.city = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.error = null;
      
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<RegisterUserError | undefined>) => {
        state.error = action.payload ?? null;
      });
  },
});

export const {
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
  setError,
  setCity,
  resetForm,
} = RegistrationSlice.actions;

export default RegistrationSlice.reducer;