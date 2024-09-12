/* eslint-disable no-self-assign */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/url";
const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    message: null,
    error: null,
    loading: false,
  },

  reducers: {
    requestForAllApplications(state) {
      state.loading = true;
      state.error = null;
    },
    successForAllApplications(state, action) {
      state.loading = false;
      state.applications = action.payload;
      state.error = null;
    },
    failureForAllApplications(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForMyApplications(state) {
      state.loading = true;
      state.error = null;
    },
    successForMyApplications(state, action) {
      state.loading = false;
      state.applications = action.payload;
      state.error = null;
    },
    failureForMyApplications(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForPostApplication(state) {
      state.loading = true;
      state.error = null;
    },
    successForPostApplication(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    failureForPostApplication(state, action) {
      state.error = action.payload;
      state.loading = false;
      // state.message = null;
    },
    requestForDeleteApplication(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    successForDeleteApplication(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    failureForDeleteApplication(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
      state.applications = state.applications;
    },
    resetApplicationSlice(state) {
      state.error = null;
      state.applications = state.applications;
      state.message = null;
      state.loading = false;
    },
  },
});

export const fetchEmployerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForAllApplications());
  try {
    const response = await axios.get(`{BASE_URL}/application/employer/getall`, {
      withCredentials: true,
    });
    dispatch(
      applicationSlice.actions.successForAllApplications(
        response.data.applications
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForAllApplications(
        error.response.data.message
      )
    );
  }
};

export const fetchJobSeekerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForMyApplications());
  try {
    const response = await axios.get(
      `{BASE_URL}/application/jobSeeker/getall`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      applicationSlice.actions.successForMyApplications(
        response.data.applications
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForMyApplications(
        error.response.data?.message || "An error occurred"
      )
    );
  }
};

export const postApplication = (data, jobId) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForPostApplication());
  try {
    const response = await axios.post(
      `http://localhost:4000/api/v1/application/post-application/${jobId}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(
      applicationSlice.actions.successForPostApplication(response.data.message)
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    // console.log(error.response);
    dispatch(
      applicationSlice.actions.failureForPostApplication(
        error.response.data?.message || "An error occurred"
      )
    );
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForDeleteApplication());
  try {
    const response = await axios.delete(
      `${BASE_URL}/application/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(
      applicationSlice.actions.successForDeleteApplication(
        response.data.message
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForDeleteApplication(
        error.response.data.message
      )
    );
  }
};

export const clearAllApplicationErrors = () => (dispatch) => {
  dispatch(applicationSlice.actions.clearAllErrors());
};

export const resetApplicationSlice = () => (dispatch) => {
  dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer;
