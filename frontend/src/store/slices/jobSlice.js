/* eslint-disable no-self-assign */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { BASE_URL } from "../../config/url";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    message: null,
    singleJob: {},
    myJobs: [],
    limit: 10,
    totalPages: 1,
  },
  reducers: {
    requestForAllJobs(state) {
      state.loading = true;
      state.error = null;
    },
    successForAllJobs(state, action) {
      state.loading = false;
      state.jobs = action.payload.jobs;
      state.message = action.payload.message;
      state.totalPages = action.payload.totalPages;
      state.error = null;
    },
    failureForAllJobs(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForSingleJob(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    successForSingleJob(state, action) {
      state.loading = false;
      state.error = null;
      state.singleJob = action.payload;
    },
    failureForSingleJob(state, action) {
      state.loading = false;
      state.error = action.payload;
      // state.singleJob = state.singleJob;
    },
    requestForPostJob(state) {
      state.message = null;
      state.loading = true;
      state.error = null;
    },
    successForPostJob(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    failureForPostJob(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    requestForDeleteJob(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForDeleteJob(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForDeleteJob(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    requestForMyJobs(state) {
      state.loading = true;
      state.error = null;
      state.jobs = [];
    },
    successForMyJobs(state, action) {
      state.loading = false;
      state.myJobs = action.payload.myJobs;
      state.totalPages = action.payload.totalPages;
      state.error = null;
    },
    failureForMyJobs(state, action) {
      state.loading = false;
      state.myJobs = state.myJobs;
      state.error = action.payload;
    },
    clearAllErrors(state) {
      state.error = null;
      state.jobs = state.jobs;
    },
    resetJobSlice(state) {
      state.error = null;
      state.jobs = state.jobs;
      state.loading = false;
      state.message = null;
      state.myJobs = state.myJobs;
      state.totalPages = state.totalPages;
      state.singleJob = {};
    },
  },
});

export default jobSlice.reducer;

export const fetchJobs =
  (city, niche, searchKeyword = "", page, limit) =>
  async (dispatch) => {
    try {
      dispatch(jobSlice.actions.requestForAllJobs());
      let link = `${BASE_URL}/job/getall?`;
      let queryParams = [];
      if (searchKeyword) {
        queryParams.push(`searchKeyword=${searchKeyword}`);
      }
      if (city) {
        queryParams.push(`city=${city}`);
      }
      if (niche) {
        queryParams.push(`niche=${niche}`);
      }
      if (page) {
        queryParams.push(`page=${page}`);
      }
      if (limit) {
        queryParams.push(`limit=${limit}`);
      }
      link += queryParams.join("&");
      const response = await axios.get(link, { withCredentials: true });
      dispatch(jobSlice.actions.successForAllJobs(response.data));
      dispatch(jobSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        jobSlice.actions.failureForAllJobs(
          error.response.data?.message || "an error occurred"
        )
      );
    }
  };

export const fetchSingleJob = (jobId) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForSingleJob());
  try {
    const response = await axios.get(`${BASE_URL}/job/get/${jobId}`, {
      withCredentials: true,
    });
    dispatch(jobSlice.actions.successForSingleJob(response.data.job));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      jobSlice.actions.failureForSingleJob(
        error.response.data?.message || "an error occurred"
      )
    );
  }
};

export const postJob = (jobData) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForPostJob());
  try {
    const response = await axios.post(`${BASE_URL}/job/post`, jobData, {
      withCredentials: true,
    });
    dispatch(jobSlice.actions.successForPostJob(response.data.message));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      jobSlice.actions.failureForPostJob(
        error.response.data?.message || "an error occurred"
      )
    );
  }
};
export const getMyJobs = (page, limit) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForMyJobs());
  try {
    const response = await axios.get(
      `${BASE_URL}/job/getmyjobs?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );
    // console.log(response.data.message);
    dispatch(jobSlice.actions.successForMyJobs(response.data));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      jobSlice.actions.failureForMyJobs(
        error.response.data?.message || "an error occured"
      )
    );
  }
};
export const deleteJob = (id) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForDeleteJob());
  try {
    const response = await axios.get(`${BASE_URL}/job/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(jobSlice.actions.successForDeleteJob(response.data.message));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      jobSlice.actions.failureForDeleteJob(
        error.response.data?.message || "an error occured"
      )
    );
  }
};
export const clearAllJobErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearAllErrors());
};

export const resetJobSlice = () => (dispatch) => {
  dispatch(jobSlice.actions.resetJobSlice());
};
