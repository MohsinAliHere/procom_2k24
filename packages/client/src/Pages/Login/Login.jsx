import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import LoginImg from "../../assets/loginImg.png";
import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IoWallet } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login_user_async } from "../../service/authService";
import Custom_Button from "../../components/button/Custom_Button";
import { asyncStatus } from "../../utlis/async_status";
import { successMsg } from "../../utlis/common";

const Login = () => {
  const navigate = useNavigate()
  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch()
  const { login_status, login_error, isAuth } = useSelector((state) => state.user_auth);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    dispatch(login_user_async(values))

  };

  useEffect(() => {
    if (isAuth) {
      successMsg("User Login Successfully")
      navigate("/dashboard")
    }
    
  }, [isAuth])


  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
      spacing={0}
    >
      <Grid
        className="animate__animated animate__fadeInDownBig"
        xs={12}
        sm={12}
        md={5}
        lg={5}
      >
        <Stack>
          <Box
            sx={{
              marginTop: "10px",
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 700,
                height: "auto",
              },
            }}
          >
            <Paper>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Stack paddingX={3}>
                     {
                        login_error && <Stack padding={1}>
                          <Typography color="red" textAlign="center" variant="body1">
                            {login_error}

                          </Typography>
                        </Stack>
                      }
                    <Stack
                      direction="row"
                      my={2}
                      justifyContent="center"
                      spacing={1}
                      alignItems="center"
                    >
                      <IoWallet color={"#00B8D0"} size={35} />
                     
                    </Stack>
                    <Stack direction="column">
                    <Typography textAlign="center" variant="h4">
                  
                  <span style={{ color: "#00B8D0" , fontWeight:"bold" }}>Customer/Merchant </span>{" "}
                   Account
                </Typography>

                      <Stack my={2} direction="column" spacing={2}>
                        <Field
                          id="email"
                          name="email"
                          as={TextField}
                          label="Email Address"
                          variant="outlined"
                        />
                        <ErrorMessage name="email" style={{ color: "red" }} component="div" />

                        <Field
                          id="password"
                          name="password"
                          as={TextField}
                          label="Password"
                          variant="outlined"
                          type="password"
                        />
                        <ErrorMessage style={{ color: "red" }} name="password" component="div" />
                      </Stack>
                    </Stack>

                    <Stack>
                      <Custom_Button
                        loading={login_status === asyncStatus.LOADING}
                        type="submit"
                        paddingY={2}
                        variant="contained"
                        color="primary"
                      >
                        Login
                      </Custom_Button>
                    </Stack>

                    <Stack  paddingY={2}>
                      <Typography align="center" variant="body1">
                        Don't have an account{" "}
                        <Link to="/register">Signup now</Link>{" "}
                      </Typography>
                    </Stack>

                   
                  </Stack>


                </Form>
              </Formik>
            </Paper>
          </Box>
        </Stack>
      </Grid>
      <Grid
        className="animate__animated animate__fadeInDownBig"
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            md: "block",
          },
        }}
        xs={12}
        sm={12}
        md={9}
        lg={5}
      >
        <Stack direction="row" justifyContent="center" alignItems="center">
          <img width="70%" src={LoginImg} alt="" />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Login;
