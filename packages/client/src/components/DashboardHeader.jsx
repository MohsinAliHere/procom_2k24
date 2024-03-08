import React from "react";
import Typography from "@mui/material/Typography";
import { Stack, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { roleMatch } from "../utlis/common";
import { IoWallet } from "react-icons/io5";
import { useNavigate } from "react-router";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { role , user_data } = useSelector((state) => state.user_auth);




  const goTopaymentPage = () => {
    if (role == roleMatch.customer) {
      navigate("/dashboard/instantPayments");
    } else {
      navigate("/dashboard/paymentRequets");

    }
  };

  return (
    <Stack
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FAFAFA",
        boxShadow: "0 0 15px -3px rgba(0, 0, 0, 0.1) inset",
        padding: "8px",
        zIndex: 10,
      }}
    >
      <Stack
        padding={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <IoWallet
            color={role == roleMatch.customer ? "#00B8D0" : "#744FEA"}
            size={35}
          />
          <Typography fontWeight="bolder" variant="h5">
            {role == roleMatch.customer ? "Customer Portal" : "PayHabib"}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            onClick={goTopaymentPage}
            variant="outlined"
            sx={{ padding: "10px 25px" }}
          >
            Create
          </Button>
          <Typography fontWeight="bold" variant="h6">
             {user_data?.username} 👋
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DashboardHeader;
