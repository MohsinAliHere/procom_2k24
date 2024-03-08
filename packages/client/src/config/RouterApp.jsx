import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import Register from "../Pages/Register/Regisiter";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import { asyncStatus } from "../utlis/async_status";
import { LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { check_user_auth_async } from "../service/authService";
import { save_tokens_constant } from "../utlis/constants";
import { setUserAuth } from "../redux/slice/user_auth_slice";
import CustomLoader from "../components/CustomLoader";

const ProtectRoutes = () => {
  const isAuthenticated = useSelector((state) => state.user_auth.isAuth);

  return <>{isAuthenticated ? <Outlet /> : <Navigate to="/" replace />}</>;
};

const RouterApp = () => {
  const { role, isAuth, check_auth_status, user_data, check_auth_error } =
    useSelector((state) => state.user_auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const authTokens = localStorage.getItem(save_tokens_constant)
      ? localStorage.getItem(save_tokens_constant)
      : null;

    if (check_auth_status === asyncStatus.IDLE) {
      console.log("Authentication", authTokens);
      if (authTokens) {
        dispatch(check_user_auth_async());
      } else {
        dispatch(setUserAuth(false));
      }
    }
  }, []);

  if (
    check_auth_status === asyncStatus.LOADING ||
    check_auth_status === asyncStatus.IDLE
  ) {
    return <CustomLoader />;
  }

  if (check_auth_status === asyncStatus.SUCCEEDED) {
    return (
      <Router>
        <Routes>
          <Route element={<ProtectRoutes />}>
            <Route path="dashboard/*" element={<Dashboard />} />
          </Route>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }

  if (check_auth_status === asyncStatus.ERROR) {
    return (
      <Stack sx={{ height: "100vh" }} direction='row' justifyContent="center" alignItems="center">
        <Typography variant="h5" textAlign="center" color="red">
          {check_auth_error.message}
        </Typography>
      </Stack>
    );
  }
};




export default RouterApp;
