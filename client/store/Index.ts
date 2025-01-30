import { configureStore } from '@reduxjs/toolkit';
import registrationReducer  from '../store/slice/RegistrationSlice'
import loginReducer from '../store/slice/LoginSlice';
import authReducer from '../store/slice/AuthSlice';
import profileReducer from './slice/ProfileSlice';
import userReducer from './slice/UserSlice';


export const store = configureStore({
    reducer:{
        Registration: registrationReducer,
        Login: loginReducer,
        Auth: authReducer,
        Profile: profileReducer,
        user: userReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch