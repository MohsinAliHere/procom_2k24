import React from "react";
import "./Dashboard.css";
import { Stack, Typography, IconButton } from "@mui/material";
import { customerPages, errorMsg, merchantPages, roleMatch, successMsg } from "../../utlis/common.jsx";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { FaPowerOff } from "react-icons/fa6";
import {  logoutUser } from "../../redux/slice/user_auth_slice.jsx";
import { apiHandle } from "../../config/apiHandle/apiHandle.jsx";



const Dashboard = () => {
  const location = useLocation();
  const { role } = useSelector((state) => state.user_auth)
  const Checkrole = role == roleMatch.customer ? customerPages : merchantPages
  const dispatch = useDispatch()
  const logOut = async () => {
    try {
       const res = await apiHandle.post("/logout")
       successMsg(res?.data.message)
       dispatch(logoutUser())
    } catch (error) {
        errorMsg(error.message || "Something went wrong") 
    }
  }



  return (
    <>
      <Stack mb={10} >
        <DashboardHeader />
      </Stack>
      <Stack>
        <Stack className="sidebar">
          <Stack padding={2}>
            {Checkrole.map((page, index) => {
              console.log("Path Name ===> ", location.pathname);
              const isActive = location.pathname === `/dashboard${page.link}`;
              const backgroundColor = isActive
                ? Checkrole === customerPages
                  ? "#00BDD5"
                  : "#744FEA"
                : "";
              return (
                <Link
                  to={`/dashboard${page.link}`}
                  style={{ textDecoration: "none" }}
                  key={index}
                >
                  <Stack
                    sx={{
                      padding: "8px",
                      borderRadius: "8px",
                      backgroundColor,
                    }}
                    spacing={1}
                    my={1.5}
                    direction="row"
                    alignItems="center"
                  >
                    <Stack>
                      {React.cloneElement(page.icons, {
                        color: isActive ? "white" : "black",
                      })}
                    </Stack>
                    <Stack>
                      <Typography
                        className={isActive ? "activeLink" : "inactiveLink"}
                        variant="h6"
                      >
                        {page.title}
                      </Typography>
                    </Stack>
                  </Stack>
                </Link>
              );
            })}


            <Stack padding={1} alignItems="center" direction="row" mt={role == roleMatch.customer ? 35 : 25} spacing={1} >
              <IconButton aria-label="" onClick={logOut} >
                <FaPowerOff size={25} color="red" />
              </IconButton>
              <Typography
                variant="h6"
              >
                Log Out
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack className="content">
          <Routes>
            {Checkrole.map((menu, index) => (
              <Route key={index} path={menu.link} element={menu.element} />
            ))}
          </Routes>
        </Stack>
      </Stack>
    </>
  );
};

export default Dashboard;
