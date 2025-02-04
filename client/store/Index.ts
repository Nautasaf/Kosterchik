import { configureStore } from '@reduxjs/toolkit'
import registrationReducer from '../store/slice/RegistrationSlice'
import loginReducer from '../store/slice/LoginSlice'
import authReducer from '../store/slice/AuthSlice'
import profileReducer from './slice/ProfileSlice'
import userReducer from './slice/UserSlice'
import eventsReducer from '../store/slice/EventFetch'
import searchReducer from '../store/slice/SearchSlice'
import eventReducer from '../store/slice/EventSlice'
import AllUserReduser from '../store/slice/AllUserSlice'



export const store = configureStore({
  reducer: {
    Registration: registrationReducer,
    Login: loginReducer,
    Auth: authReducer,
    Profile: profileReducer,
    user: userReducer,
    Events: eventsReducer,
    search: searchReducer,
    AllUsers: AllUserReduser,
    event: eventReducer, // Добавляем новый слайс
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
