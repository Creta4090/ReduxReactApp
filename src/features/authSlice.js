import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      // Store token and user data in localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      // Remove token and user data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    // Check if user is already logged in (e.g., on app start)
    checkAuth: (state) => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token) {
        state.isAuthenticated = true;
        state.token = token;
        // Restore user data from localStorage
        if (user) {
          state.user = JSON.parse(user);
        }
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;