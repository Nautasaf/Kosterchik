import { configureStore } from '@reduxjs/toolkit';
import registrationReducer  from '../store/slice/RegistrationSlice'
import loginReducer from '../store/slice/LoginSlice';
import authReducer from '../store/slice/AuthSlice';


export const store = configureStore({
    reducer:{
        Registration: registrationReducer,
        Login: loginReducer,
        Auth: authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch