import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/url";
import { act } from "react";
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.user = {};
      state.isAuthenticated = false;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.user = {};
      state.isAuthenticated = false;
    },
    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.isAuthenticated = false;
      state.user = {};
    },
    clearAllErrors(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.user = {};
    },
    fetchUserRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.user = {};
      state.isAuthenticated = false;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      state.message = null;
      state.isAuthenticated = true;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.user = {};
    },
    // logoutRequest(state) {
    //   state.loading = true;
    //   state.error = null;
    //   state.message = null;
    //   state.user = {};
    //   state.isAuthenticated = false;
    // },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.error = null;
      state.user = {};
    },
    logoutFailed(state, action) {
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
  },
});

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, data, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(userSlice.actions.registerSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed(error.response.data.message));
  }
};
export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    dispatch(userSlice.actions.loginSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailure(error.response.data.message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get(`${BASE_URL}/user/getuser`, {
      withCredentials: true,
    });
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/logout`, {
      withCredentials: true,
    });
    dispatch(userSlice.actions.logoutSuccess());
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message));
  }
};
export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};
export default userSlice.reducer;
