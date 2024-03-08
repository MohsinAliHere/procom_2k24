import {
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography, Button,
} from "@mui/material";
import React, { useState } from "react";
import { MdOutlinePeople } from "react-icons/md";
import { IoCartOutline, IoWallet } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const { isAuth } = useSelector((state) => state.user_auth)


  const handleMenuClick = () => {
    setActive(!active);
  };

  const menu = [
    {
      url: "/",
      title: "Services",
    },
    {
      url: "/products",
      title: "Solutions",
    },
    {
      url: "/contact",
      title: "Pricing",
    },
    {
      url: "/contact",
      title: "Help Center",
    },
  ];

  return (
    <>


      <Stack
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Stack
          sx={{
            backgroundColor: "white",
          }}
        >
          <Container>
            <Stack
              sx={{ cursor: "pointer" }}
              my={3}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* hamburger */}
              <Stack
                sx={{
                  display: {
                    xs: "block",
                    sm: "block",
                    md: "none",
                    lg: "none",
                  },
                }}
              >
                {active ? (
                  <IoMdClose
                    className="animate__animated animate__rotateIn animate__faster"
                    color="#744FEA"
                    onClick={handleMenuClick} size="32" />
                ) : (
                  <CiMenuBurger
                    color="#744FEA"

                    onClick={handleMenuClick} size="28" />
                )}
              </Stack>

              {/* logo */}
              <Stack>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  <Stack direction="row" my={2} justifyContent="center" spacing={1} alignItems="center">
                    <IoWallet
                      color={"#744FEA"}
                      size={35}
                    />
                    <Typography fontWeight="bolder" variant="h5">
                      PayHabib
                    </Typography>
                  </Stack>
                </Link>
              </Stack>

              {/* menu links */}
              <Stack
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                    lg: "block",
                  },
                }}
              >
                <Stack
                  className=""
                  direction="row"
                  alignItems="center"
                  spacing={4}
                >
                  {menu.map((item, index) => {
                    return (
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={item.url}
                        key={index}
                      >
                        <Typography variant="h6">{item.title}</Typography>
                      </Link>
                    );
                  })}
                </Stack>
              </Stack>

              <Stack direction="row" alignItems="center">
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Button size="large" variant="text" sx={{ color: "#744FEA" }}>
                    {!isAuth ? "Login" : "Dashboard"}
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Container>
        </Stack>
        <Stack sx={{ backgroundColor: "red" }}>
          {active && (
            <Stack
              direction="column"
              spacing={3}
              sx={{
                backgroundColor: "white",
                padding: "20px",
              }}
            >
              {menu.map((link) => {
                return (
                  <Link style={{ textDecoration: "none", color: "black" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6">{link.title}</Typography>
                      <FaArrowRightLong size="20" />
                    </Stack>
                  </Link>
                );
              })}
            </Stack>
          )}
        </Stack>
      </Stack>

    </>
  );
};

export default Navbar;
