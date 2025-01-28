import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterUserError, RegisterUserResponse, LoginState } from '../../interface/Registration';
import { loginUser } from '../thunk/LoginThunk'; // если ты создаешь отдельную операцию для логина

const initialState: LoginState = {
  email: '',
  password: '',
  city: '',
  error: null,
  isLoggedIn: false
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
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<RegisterUserResponse>) => {
        state.error = null; 
        state.city = action.payload.data.city || 'ничего нет '; 
        state.isLoggedIn = true;
      
       
      })
      .addCase(loginUser.rejected, (state,  action: PayloadAction<RegisterUserError | undefined>) => {
        if (action.payload) {
          state.error = action.payload; 
        } else {
          state.error = { message: 'Ошибка логина' }; 
        }
      });
  },
});

export const {
 
  setEmail,
  setPassword,
 
  setCity,
  
  resetForm,
} = LoginSlice .actions;

export default LoginSlice .reducer;