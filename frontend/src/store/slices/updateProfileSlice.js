import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { BASE_URL } from "../../config/url";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: {
    loading: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    updateProfileRequest(state) {
      state.loading = true;
    },
    updateProfileSuccess(state) {
      state.loading = false;
      state.isUpdated = true;
      state.error = null;
    },
    updateProfileFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isUpdated = false;
    },
    updatePassswordRequest(state) {
      state.loading = true;
    },
    updatePasswordSuccess(state) {
      state.loading = false;
      state.isUpdated = true;
      state.error = null;
    },
    updatePasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isUpdated = false;
    },
    profileResetAfterUpdate(state) {
      state.error = null;
      state.isUpdated = false;
    },
  },
});

export const updateProfile = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updateProfileRequest());
  try {
    const response = await axios.put(`${BASE_URL}/user/update-profile`, data, {
      withCredentials: true,

      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    dispatch(updateProfileSlice.actions.updateProfileSuccess());
  } catch (error) {
    dispatch(
      updateProfileSlice.actions.updateProfileFail(
        error.response.data?.message || "Failed to update profile"
      )
    );
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updatePassswordRequest());
  try {
    const response = await axios.put(`${BASE_URL}/user/update-password`, data, {
      withCredentials: true,
      headers: { "Content-Type": "appication/json" },
    });
    console.log(response);
    dispatch(updateProfileSlice.actions.updatePasswordSuccess());
  } catch (error) {
    dispatch(
      updateProfileSlice.actions.updatePasswordFail(
        error.response.data?.message || "Failed to update password"
      )
    );
  }
};

export const clearAllUpdateProfileErrors = () => async (dispatch) => {
  dispatch(updateProfileSlice.actions.profileResetAfterUpdate());
};

export default updateProfileSlice.reducer;
