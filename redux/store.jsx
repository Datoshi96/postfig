import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './states/user.state';
import userReducer from './states/user.state'


export const store = configureStore({
  reducer:{
    userReducer,
  }
});

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
    }
  })
}