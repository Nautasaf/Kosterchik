import { createSlice } from '@reduxjs/toolkit';
import { UserState} from '../../interface/Registration'
import { fetchUsers } from '../thunk/AllUserThunk';

const initialState: UserState = {
    users: null,
    loading: false,
    error: null,
  };


  const AlluserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Неизвестная ошибка';
        });
    },
  });
  
  export default AlluserSlice.reducer;