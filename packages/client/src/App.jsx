import React from "react";
import RouterApp from "./config/RouterApp";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./utlis/theme";
import "animate.css";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Regisiter";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterApp />
    
      <Toaster position="bottom-right" reverseOrder={false} />
    </ThemeProvider>
  );
};

export default App;
