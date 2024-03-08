import React, { useEffect, useState } from 'react';
import TabHeading from '../../../../components/TabHeading';
import Typography from '@mui/material/Typography';
import { Stack, Grid, Box, Paper, TextField, MenuItem, FormControl, Select, Button, Chip } from '@mui/material';
import { IoWallet } from 'react-icons/io5';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { apiHandle } from '../../../../config/apiHandle/apiHandle';
import * as Yup from "yup";
import CustomLoader from '../../../../components/CustomLoader';
import { errorMsg } from '../../../../utlis/common';

const CustomerSetting = () => {
  const [allBanksAcc, setAllBanksAcc] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (values) => {
    try {
      console.log("Submit", values);
      setLoading(true);
      const res = await apiHandle.post("/bank-account", values);
      getAllBank();
      setLoading(false);
    } catch (error) {
        console.log(error);
    }
  };

  const validationSchema = () => (
    Yup.object().shape({
      account_title: Yup.string().required('Account Title is required'),
      account_number: Yup.string().required('Account Number is required'),
      bank_name: Yup.string().required('Bank Name is required'),
    })
  );

  const getAllBank = async () => {
    try {
      setLoading(true);
      const res = await apiHandle.get("/bank-accounts");
      const {data} = res.data;
      console.log("Bank", data);
      setAllBanksAcc(data);
      setLoading(false);
    } catch (error) {
      errorMsg(error.response.data.message || "Transaction List request failed")
    }
  };

  useEffect(() => {
    getAllBank();
  }, []);

  if(loading){
    return <CustomLoader />
  }

  return (
    <>
      <TabHeading heading="Bank Accounts" />

      {/* <Stack padding={3}>
        <Typography variant="h5">All Banks Accounts</Typography>
      </Stack> */}
      <Grid padding={2}  container spacing={2}>
        {allBanksAcc.length === 0 ? (
          <Typography variant="body1">No Acc Found</Typography>
        ) : (
          allBanksAcc.map((acc) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={acc.id}>
              <Stack sx={{
                border: "2px dotted #00BDD5",
                borderRadius: 5,
                padding: 1
              }} >
                <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" >
                  <Typography variant="h5" >{acc.account_title}</Typography>
                  <Chip sx={{ backgroundColor: "white" }} label={acc.account_number} variant="outlined" />
                  <Chip sx={{ backgroundColor: "white" }} label={acc.bank_name} variant="outlined" />
                </Stack>
              </Stack>
            </Grid>
          ))
        )} 
      </Grid>




      <Box justifyContent={'center'} sx={{ marginTop: "10px", display: "flex", flexWrap: "wrap", "& > :not(style)": { m: 1, width: 700, height: "auto" } }}>
        <Paper>
          <Stack direction="column" padding={2}>
            <Stack direction="row" my={2} justifyContent="center" spacing={1} alignItems="center">
              <IoWallet color="#00B8D0" size={35} />
              <Typography fontWeight="bolder" variant="h5">
                Add Bank Account
              </Typography>
            </Stack>

            <Formik
              initialValues={{
                account_title: "",
                account_number: "",
                bank_name: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {(formik) => (
                <Form>
                  <Stack padding={1} direction="column">
                    <Stack padding={1} direction="column">
                      <Typography fontWeight="bold" variant="body1">
                        Account Title *
                      </Typography>
                      <Field
                        name="account_title"
                        id="account_title"
                        type="text"
                        as={TextField}
                        variant="outlined"
                      />
                      <ErrorMessage name="account_title" component="div" style={{ color: "red" }} />
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
                      <ErrorMessage name="account_number" component="div" style={{ color: "red" }} />
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
                          name="bank_name"
                          variant="outlined"
                        >
                          <MenuItem value="">Select Bank Name</MenuItem>
                          <MenuItem value="Habib Bank Limited">Habib Bank Limited</MenuItem>
                          <MenuItem value="United Bank Limited">United Bank Limited</MenuItem>
                          <MenuItem value="MCB Bank Limited">MCB Bank Limited</MenuItem>
                          <MenuItem value="National Bank of Pakistan">National Bank of Pakistan</MenuItem>
                        </Field>
                      </Field>
                      <ErrorMessage style={{color:"red"}} name="bank_name" component="div" />
                    </Stack>
                    <Stack padding={1}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Add
                      </Button>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
        </Paper>
      </Box>
      
    </>
  );
};

export default CustomerSetting;
