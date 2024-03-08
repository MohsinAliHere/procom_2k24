import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import LoginImg from "../../assets/loginImg.png";
import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IoWallet } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { errorMsg, roleMatch, successMsg } from "../../utlis/common";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signup_user_async } from "../../service/authService";
import Custom_Button from "../../components/button/Custom_Button";
import { asyncStatus } from "../../utlis/async_status";

const Register = () => {
  const { role, isAuth, signup_status, signup_error } = useSelector((state) => state.user_auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required"),
    account_title: Yup.string().required("Account title is required"),
    account_number: Yup.string().required("Account Number is required"),
    user_role: Yup.string().required("Role is required"),
    bankName: Yup.string().required("Bank name is required"),
  });

  const handleSubmit = (values) => {
    const payload = {
      username: values.username,
      account_title: values.account_title,
      account_number: values.account_number,
      bank_name: values.bankName,
      email: values.email,
      password: values.password,
      phone_number: values.phone,
      user_role: values.user_role,
    };
    dispatch(signup_user_async(payload));
  };

  useEffect(() => {
    if (isAuth) {
      successMsg("Register Successfully 👋  ");
      navigate("/dashboard");
    }

  }, [isAuth, signup_error]);

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
              <Stack direction="column" padding={2}>
                <Stack
                  direction="row"
                  my={2}
                  justifyContent="center"
                  spacing={1}
                  alignItems="center"
                >
                  <IoWallet color={"#00B8D0"} size={35} />
                 
                </Stack>
                <Typography textAlign="center" variant="h4">
                  Create <br />
                  <span style={{ color: "#00B8D0" , fontWeight:"bold" }}>Customer/Merchant </span>{" "}
                  Portal Account
                </Typography>
                <Formik
                  initialValues={{
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                    account_title: "",
                    account_number: "",
                    bankName: "",
                    user_role: ""
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  {(formik) => (
                    <Form>
                      <Stack padding={1} direction="column">
                        {
                          signup_error && <Stack padding={1}>
                            <Typography color="red" textAlign="center" variant="body1">
                              {signup_error}
                            </Typography>
                          </Stack>
                        }
                        <Typography fontWeight="bold" variant="body1">
                          Username *
                        </Typography>
                        <Field
                          name="username"
                          id="username"
                          type="text"
                          as={TextField}
                          variant="outlined"
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Stack>
                      <Stack padding={1} direction="column">
                        <Typography fontWeight="bold" variant="body1">
                          Account title *
                        </Typography>
                        <Field
                          name="account_title"
                          id="account_title"
                          type="text"
                          as={TextField}
                          variant="outlined"
                        />
                        <ErrorMessage
                          name="account_title"
                          color="red"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Stack>
                      <Stack padding={1} direction="column">
                        <Typography fontWeight="bold" variant="body1">
                          Account Number *
                        </Typography>
                        <Field
                          name="account_number"
                          id="account_number"
                          type="text"
                          as={TextField}
                          variant="outlined"
                        />
                        <ErrorMessage
                          name="account_number"
                          color="red"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Stack>
                      <Stack padding={1} direction="column">
                        <Field as={FormControl} fullWidth margin="dense">
                          <Typography fontWeight="bold" variant="body1">
                            Bank Name *
                          </Typography>
                          <Field
                            as={Select}
                            labelId="bankName-label"
                            id="bankName"
                            name="bankName"
                            variant="outlined"
                          >
                            <MenuItem value="">
                              Select Customer Bank Name
                            </MenuItem>
                            <MenuItem value="Habib Bank Limited">
                              Habib Bank Limited
                            </MenuItem>
                            <MenuItem value="United Bank Limited">
                              United Bank Limited
                            </MenuItem>
                            <MenuItem value="MCB Bank Limited">
                              MCB Bank Limited
                            </MenuItem>
                            <MenuItem value="National Bank of Pakistan">
                              National Bank of Pakistan
                            </MenuItem>
                          </Field>
                        </Field>
                        <ErrorMessage name="bankName" component="div" />
                      </Stack>
                      <Stack padding={1} direction="column">
                        <Typography fontWeight="bold" variant="body1">
                          Email *
                        </Typography>
                        <Field
                          name="email"
                          id="email"
                          type="email"
                          as={TextField}
                          variant="outlined"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Stack>
                      <Stack padding={1} direction="column">
                        <Typography fontWeight="bold" variant="body1">
                         Select Role :
                        </Typography>
                        <Field  as={RadioGroup} name="user_role">
                          <FormControlLabel value="customer" control={<Radio />} label="customer" />
                          <FormControlLabel value="merchant" control={<Radio />} label="merchant" />
                        </Field>
                      </Stack>
                      <Stack padding={1} direction="column">
                        <Typography fontWeight="bold" variant="body1">
                          Phone Number *
                        </Typography>
                        <Field
                          name="phone"
                          id="phone"
                          type="text"
                          as={TextField}
                          variant="outlined"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Stack>
                      <Stack padding={1} direction="column">
                        <Typography fontWeight="bold" variant="body1">
                          Password *
                        </Typography>
                        <Field
                          name="password"
                          id="password"
                          type="password"
                          as={TextField}
                          variant="outlined"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Stack>
                      <Stack padding={1}>
                        <Custom_Button
                          loading={signup_status === asyncStatus.LOADING}
                          type="submit"
                          paddingY={2}
                          variant="contained"
                          color="primary"
                        >
                          Signup
                        </Custom_Button>
                      </Stack>
                      <Stack padding={1}>
                        <Typography align="center" variant="body1">
                          Already have a account{" "}
                          <Link to="/login">Login now</Link>{" "}
                        </Typography>
                      </Stack>

                    </Form>
                  )}
                </Formik>
              </Stack>
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
          <img width="80%" src={LoginImg} alt="" />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Register;
