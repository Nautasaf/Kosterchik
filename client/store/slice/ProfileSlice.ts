import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  photoUrl: string;
  username: string;
  email: string;
  city: string;
}

const initialState: ProfileState = {
  photoUrl: '',
  username: '',
  email: '',
  city: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setPhotoUrl: (state, action: PayloadAction<string>) => {
      state.photoUrl = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    resetProfile: (state) => {
      state.photoUrl = '';
      state.username = '';
      state.email = '';
      state.city = '';
    },
  },
});

export const { setPhotoUrl, setUsername, setEmail, setCity, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;