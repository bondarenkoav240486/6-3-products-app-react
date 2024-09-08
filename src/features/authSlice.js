// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
// Function to get the initial authentication state from localStorage
const getInitialAuthState = () => {
    const token = localStorage.getItem('token');
    return {
      isAuthenticated: !!token,
      token: token ? token : null,
    };
  };
const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(),
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
