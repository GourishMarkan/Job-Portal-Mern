/* eslint-disable no-self-assign */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/url";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
    message: null,
    singleBlog: {},
  },
  reducers: {
    requestForAllBlogs(state) {
      state.loading = true;
      state.error = null;
    },
    successForAllBlogs(state, action) {
      state.loading = false;
      state.blogs = action.payload.blogs;
      state.error = null;
      state.message = action.payload.message;
    },
    failureForAllBlogs(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    requestForSingleBlogs(state) {
      state.loading = true;
      state.error = null;
    },
    successForSingleBlog(state, action) {
      state.loading = false;
      state.singleBlog = action.payload.blog;
      state.message = action.payload.message;
      state.error = null;
    },
    failureForSingleBlog(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    requestForPostBlog(state) {
      state.loading = true;
      state.error = null;
    },
    successForPostBlog(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    failureForPostBlog(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    requestForDeleteBlog(state) {
      state.loading = true;
      state.error = null;
    },
    successForDeleteBlog(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    failureForDeleteBlog(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.singleBlog = state.singleBlog;
    },
    requestForUpdateBlog(state) {
      state.loading = true;
      state.error = null;
    },
    successForUpdateBlog(state, action) {
      state.loading = false;
      state.singleBlog = action.payload.blog;
      state.error = null;
    },
    failureForUpdateBlog(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.singleBlog = state.singleBlog;
    },
    clearAllErrors(state) {
      state.error = null;
      state.blogs = state.blogs;
      state.singleBlog = state.singleBlog;
    },
    resetBlogSlice(state) {
      state.error = null;
      state.blogs = state.blogs;
      state.loading = false;
      state.message = null;
      state.singleBlog = state.singleBlog;
    },
  },
});

export default blogsSlice.reducer;

export const createBlog = (blogData) => async (dispatch) => {
  dispatch(blogsSlice.actions.requestForPostBlog());
  try {
    const response = await axios.post(`${BASE_URL}/blog/create`, blogData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(blogsSlice.actions.successForPostBlog(response.data));
  } catch (error) {
    dispatch(
      blogsSlice.actions.failureForPostBlog(
        error.response.data?.message || "Something went wrong"
      )
    );
  }
};

export const fetchAllBlogs = () => async (dispatch) => {
  dispatch(blogsSlice.actions.requestForAllBlogs());
  try {
    const response = await axios.get(`${BASE_URL}/blog/getAll`, {
      withCredentials: true,
    });
    dispatch(blogsSlice.actions.successForAllBlogs(response.data));
  } catch (error) {
    dispatch(
      blogsSlice.actions.failureForAllBlogs(
        error.response.data?.message || "Something went wrong"
      )
    );
  }
};

export const fetchSingleBlog = (id) => async (dispatch) => {
  dispatch(blogsSlice.actions.requestForSingleBlogs());
  try {
    const response = await axios.get(`${BASE_URL}/blog/get` / id, {
      withCredentials: true,
    });
    dispatch(blogsSlice.actions.successForSingleBlog(response.data));
  } catch (error) {
    dispatch(
      blogsSlice.actions.failureForSingleBlog(
        error.response.data?.message || "Something went wrong"
      )
    );
  }
};

export const updateBlog = (id, blogData) => async (dispatch) => {
  dispatch(blogsSlice.actions.requestForUpdateBlog());
  try {
    const response = await axios.put(
      `${BASE_URL}/blog/update/${id}`,
      blogData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(blogsSlice.actions.successForUpdateBlog(response.data));
  } catch (error) {
    dispatch(
      blogsSlice.actions.failureForUpdateBlog(
        error.response.data?.message || "Something went wrong"
      )
    );
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  dispatch(blogsSlice.actions.requestForDeleteBlog());
  try {
    const response = await axios.delete(`${BASE_URL}/blog/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(blogsSlice.actions.successForDeleteBlog(response.data.message));
  } catch (error) {
    dispatch(
      blogsSlice.actions.failureForDeleteBlog(
        error.response.data?.message || "Something went wrong"
      )
    );
  }
};

export const clearAllBlogErrors = () => (dispatch) => {
  dispatch(blogsSlice.actions.clearAllErrors());
};
export const resetBlogSlice = () => (dispatch) => {
  dispatch(blogsSlice.actions.resetBlogSlice());
};
