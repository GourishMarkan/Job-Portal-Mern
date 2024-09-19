import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
import userReducer from "./slices/userSlice";
import applicationReducer from "./slices/applicationSlice";
import updateProfileReducer from "./slices/updateProfileSlice";
import blogReducer from "./slices/blogSlice";
const store = configureStore({
  reducer: {
    jobs: jobReducer,
    user: userReducer,
    applications: applicationReducer,
    updateProfile: updateProfileReducer,
    blogs: blogReducer,
  },
});

export default store;
