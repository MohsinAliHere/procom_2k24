import { createSlice } from "@reduxjs/toolkit";
import { roleMatch } from "../../utlis/common";
import { asyncStatus } from "../../utlis/async_status";
import {
  check_user_auth_async,
  login_user_async,
  signup_user_async,
} from "../../service/authService";
import { save_tokens_constant, session_expired } from "../../utlis/constants";

const initialState = {
  role: roleMatch.customer,
  isAuth: false,

  check_auth_status: asyncStatus.IDLE,
  login_status: asyncStatus.IDLE,
  user_data: {},

  check_auth_error: null,
  login_error: null,

  signup_status: asyncStatus.IDLE,
  signup_error: null,


};
const user_auth_slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      state.isAuth = false,
        localStorage.removeItem(save_tokens_constant);
      localStorage.setItem(session_expired, true);
    },
    setUserAuth: (state, { payload }) => {
      state.check_auth_status = asyncStatus.SUCCEEDED;
      state.isAuth = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(check_user_auth_async.pending, (state, { payload }) => {
      state.check_auth_status = asyncStatus.LOADING;
    });

    builder.addCase(check_user_auth_async.fulfilled, (state, { payload }) => {
      state.check_auth_status = asyncStatus.SUCCEEDED;
      state.isAuth = true;
      state.user_data = payload.data;
      state.role = payload.data.user_role;
    });
    builder.addCase(check_user_auth_async.rejected, (state, actions) => {
      console.log("Check user authentication ===> ", actions);
      state.check_auth_status = asyncStatus.ERROR;
      state.check_auth_error = actions.error.message;
      state.userAuth = false;
    });

    // login services
    builder.addCase(login_user_async.pending, (state, { payload }) => {
      state.login_status = asyncStatus.LOADING;
    });

    builder.addCase(login_user_async.fulfilled, (state, { payload }) => {
      state.login_status = asyncStatus.SUCCEEDED;
      state.isAuth = true;
      state.user_data = payload.data;
      state.role = payload.data.user_role;
      localStorage.setItem(
        save_tokens_constant,
        payload.tokens.access_token
      );
    });
    builder.addCase(login_user_async.rejected, (state, actions) => {
      state.login_status = asyncStatus.ERROR;
      state.login_error = actions.error.message;
      state.userAuth = false;
    });

    // register services
    builder.addCase(signup_user_async.pending, (state, { payload }) => {
      state.signup_status = asyncStatus.LOADING;
    });

    builder.addCase(signup_user_async.fulfilled, (state, { payload }) => {
      state.signup_status = asyncStatus.SUCCEEDED;
      state.isAuth = true;
      state.user_data = payload.data;
      state.role = payload.data.user_role;
      localStorage.setItem(
        save_tokens_constant,
        payload.tokens.access_token
      );
    });
    builder.addCase(signup_user_async.rejected, (state, actions) => {
      state.signup_status = asyncStatus.ERROR;
      state.signup_error = actions.error.message;
      state.userAuth = false;
    });
  },
});

export const { logoutUser, setUserAuth } = user_auth_slice.actions;
export default user_auth_slice.reducer;
