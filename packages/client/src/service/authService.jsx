import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiHandle } from "../config/apiHandle/apiHandle.jsx";
import { type_constants } from "../utlis/constants.jsx";




export const signup_user_async = createAsyncThunk(
  type_constants.SIGNUP_USER,
  async (post_data) => {
    try {
      console.log("re")
      const response = await apiHandle.post("/signup", post_data);
      const res_data = await response.data;
      console.log("register ====> ", res_data);
      return res_data;
    } catch (error) {
      console.log("error", { error });
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);


export const login_user_async = createAsyncThunk(
  type_constants.LOGIN_USER,
  async (post_data) => {
    try {
      const response = await apiHandle.post("/login", post_data);
      console.log("response", response)
      const res_data = await response.data;
      console.log("response: ", res_data);
      return res_data;
    } catch (error) {
      console.log("error", error?.response?.data);
      if (error?.response?.data) {
        console.log("error", { error });
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

export const check_user_auth_async = createAsyncThunk(
  type_constants.CHECK_INITIAL_AUTH,
  async () => {
    try {
      const response = await apiHandle.get("/check-auth");
      const res_data = await response.data;
      return res_data;
    } catch (error) {
      console.log("error", { error });
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);