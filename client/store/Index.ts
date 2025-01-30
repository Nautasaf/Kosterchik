import { configureStore } from '@reduxjs/toolkit';
import registrationReducer  from '../store/slice/RegistrationSlice'
import loginReducer from '../store/slice/LoginSlice';
import authReducer from '../store/slice/AuthSlice';
import eventsReducer from '../store/slice/EventFetch'
import searchReducer from '../store/slice/SearchSlice'

export const store = configureStore({
    reducer:{
        Registration: registrationReducer,
        Login: loginReducer,
        Auth: authReducer,
        Events: eventsReducer,
        search: searchReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


