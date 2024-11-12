/* eslint-disable no-self-assign */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/url";
// import { act } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);
// const navigate = useNavigate();
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
      // state.message = null;
      state.isAuthenticated = false;
      // state.user = {};
    },
    clearAllErrors(state) {
      // state.loading = false;
      state.error = null;
      // state.message = null;
      state.user = state.user;
    },
    fetchUserRequest(state) {
      state.loading = true;
      state.error = null;
      // state.message = null;
      state.user = {};
      state.isAuthenticated = false;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
      // state.message = null;
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
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

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
    forgotRequest(state) {
      state.loading = true;
      state.error = null;
    },
    forgotSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    },
    forgotFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetRequest(state) {
      state.loading = true;
      state.error = null;
    },
    resetSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    },
    resetFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetUser(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.user = {};
      state.isAuthenticated = state.isAuthenticated;
    },
  },
});
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailed,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailed,
  logoutSuccess,
  logoutFailed,
  clearAllErrors,
  setError,
} = userSlice.actions;
export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, data, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);
    dispatch(userSlice.actions.registerSuccess(response.data));
    // dispatch(userSlice.actions.clearAllErrors());
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
    // console.log(response.data);
    dispatch(userSlice.actions.loginSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
    // navigate("/");
  } catch (error) {
    dispatch(userSlice.actions.loginFailure(error.response.data.message));
    // dispatch(userSlice.actions.setError(error.response.data));
  }
};

export const getUser = () => async (dispatch) => {
  // dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get(`${BASE_URL}/user/getuser`, {
      withCredentials: true,
    });
    dispatch(userSlice.actions.fetchUserSuccess(response.data));
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
    console.log(response);
    dispatch(userSlice.actions.logoutSuccess());
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message));
  }
};

export const forgot = (data) => async (dispatch) => {
  dispatch(userSlice.actions.forgotRequest());
  try {
    const resposne = await axios.post(
      `${BASE_URL}/user/forgot-password`,
      data,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.forgotSuccess(resposne.data));
  } catch (error) {
    // console.log(error);
    dispatch(userSlice.actions.forgotFailed(error.response.data.message));
  }
};

export const reset = (token, password) => async (dispatch) => {
  dispatch(userSlice.actions.resetRequest());
  try {
    const response = await axios.post(
      `${BASE_URL}/user/reset-password/${token}`,
      password,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.resetSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.resetFailed(error.response.data.message));
  }
};
export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export const resetUserSlice = () => (dispatch) => {
  dispatch(userSlice.actions.resetUser());
};

export default userSlice.reducer;
