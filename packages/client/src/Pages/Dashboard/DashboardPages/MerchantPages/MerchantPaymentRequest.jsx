import React, { useEffect, useState } from "react";
import { Box, Paper, Stack, Typography, TextField, MenuItem, Select, FormControl, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomLoader from "../../../../components/CustomLoader";
import axios from "axios";
import { apiHandle } from "../../../../config/apiHandle/apiHandle";
import { errorMsg, successMsg } from "../../../../utlis/common";
import Custom_Button from "../../../../components/button/Custom_Button";

const MerchantPaymentRequest = () => {
  const [allBanksAcc, setAllBanksAcc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBank, setSelectedBank] = useState({ bank_name: "" });

  const [loadingforPay, setloadingforPay] = useState(false)

  const initialValues = {
    Username: "",
    Email: "",
    MerchantAccountNumber: "",
    CurrentCustomerNumber: "",
    PaymentAmount: "",
    bankName: "",
    paymentPurpose: "",
  };

  const validationSchema = Yup.object().shape({
    Username: Yup.string().required("Username is required"),
    Email: Yup.string().email("Invalid email"),
    MerchantAccountNumber: Yup.string(),
    CurrentCustomerNumber: Yup.string(),
    PaymentAmount: Yup.number(),
    bankName: Yup.string(),
    paymentPurpose: Yup.string(),
  });

  const handleSubmit = async (values) => {
    try {
      setloadingforPay(true)
      const payload = {
        receiver_bank_account_ref_id: selectedBank._id,
        payee_user_name: values.Username,
        amount: values.PaymentAmount,
        purpose: values.paymentPurpose,
      };
      const res = await apiHandle.post("/merchant/payment-request", payload);
      setloadingforPay(false)
      successMsg("Requested payment done");
    } catch (error) {
      setloadingforPay(true)
      errorMsg("Enter Correct User Name" || error.response.data.message)
      setloadingforPay(false)
    }
  };

  const getAllBank = async () => {
    try {
      setLoading(true);
      const res = await apiHandle.get("/bank-accounts");
      const { data } = res.data;
      setAllBanksAcc(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllBank();
  }, []);

  const handleBankSelect = (event) => {
    const selectedBankName = event.target.value;
    const bank = allBanksAcc.find((bank) => bank.bank_name === selectedBankName);
    console.log("Bank name ===> " , bank )
    setSelectedBank(bank);
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Stack padding={3}>
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
              <Stack padding={2}>
                <Typography my={2} textAlign="center" variant="h4">
                  Payment Request For Customer
                </Typography>
                <Field
                  as={FormControl}
                  fullWidth
                  margin="dense"
                >
                  <Typography variant="body1">Select Merchant Bank Name</Typography>
                  <Field
                    as={Select}
                    labelId="bankName-label"
                    id="bankName"
                    name="bankName"
                    value={selectedBank.bank_name}
                    placeholder="Bank Name"
                    variant="outlined"
                    onChange={handleBankSelect}
                  >
                    {
                      allBanksAcc.map((bank) => (
                        <MenuItem key={bank._id} value={bank.bank_name}>
                          {bank.bank_name}
                        </MenuItem>
                      ))
                    }
                  </Field>
                </Field>
                <ErrorMessage name="bankName" component="div" style={{ color: "red" }} />

                {selectedBank && (
                  <>
                    <Field
                      as={TextField}
                      margin="dense"
                      id="account_number"
                      name="account_number"
                      placeholder="Account Number"
                      variant="outlined"
                      fullWidth
                      value={selectedBank.account_number}
                      disabled
                    />
                  </>
                )}
                <Field
                  as={TextField}
                  margin="dense"
                  id="paymentPurpose"
                  name="paymentPurpose"
                  placeholder="Payment Purpose"
                  variant="outlined"
                  fullWidth
                />
                <Field
                  as={TextField}
                  margin="dense"
                  id="Username"
                  name="Username"
                  placeholder="Username"
                  variant="outlined"
                  fullWidth
                />

                <Field
                  as={TextField}
                  margin="dense"
                  id="PaymentAmount"
                  name="PaymentAmount"
                  placeholder="Payment Amount"
                  variant="outlined"
                  fullWidth
                />

                <Stack padding={1} direction="row" justifyContent="flex-end" alignItems="center">
                  <Custom_Button
                    loading={loadingforPay}
                    type="submit"
                    paddingY={2}
                    variant="contained"
                    color="primary"
                  >
                    Pay Request
                  </Custom_Button>
                </Stack>
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </Form>
    </Formik>
  );
};

export default MerchantPaymentRequest;
