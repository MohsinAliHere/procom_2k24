import React, { useEffect, useState } from "react";
import { Box, Paper, Stack, Typography, TextField, MenuItem, Select, FormControl, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomLoader from "../../../../components/CustomLoader";
import axios from "axios";
import { apiHandle } from "../../../../config/apiHandle/apiHandle";
import { errorMsg, successMsg } from "../../../../utlis/common";
import Custom_Button from "../../../../components/button/Custom_Button";
import { useNavigate } from "react-router";

const InstantPayments = () => {
  const navigate = useNavigate()
  const [allBanksAcc, setAllBanksAcc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBank, setSelectedBank] = useState({ bank_name: "" });
  const [selectedMerchantBank, setSelectedMerchantBank] = useState({ bank_name: "" });

  const [loadingforPay, setLoadingforPay] = useState(false);
  const [merchantName, setMerchantName] = useState("");
  const [merchantBankList, setMerchantBankList] = useState([]);

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
    amount: Yup.number(),
    purpose: Yup.string(),
  });

  const handleSubmit = async (values) => {
    try {
      setLoadingforPay(true);
      const payload = {
        receiver_bank_account_ref_id: selectedMerchantBank._id,
        payee_bank_account_ref_id: selectedBank._id,
        amount: values.PaymentAmount,
        purpose: values.paymentPurpose,
      };
      const res = await apiHandle.post("/customer/instant-pay", payload);
      navigate("/dashboard")
      setLoadingforPay(false);
      successMsg("Requested payment done");
    } catch (error) {
      errorMsg(error.response?.data?.message || "Error processing payment");
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
      errorMsg(error.response.data.message || "Transaction List request failed")
      console.error(error);
    }
  };

  useEffect(() => {
    getAllBank();
  }, []);

  const handleMerchantNameChange = (event) => {
    setMerchantName(event.target.value);
    setMerchantBankList([]);
  };

  const handleMerchantBankSelect = (event) => {
    const selectedBankName = event.target.value;
    const bank = merchantBankList.find((bank) => bank.bank_name === selectedBankName);
    setSelectedMerchantBank(bank);
  };

  const handleCustomerBankSelect = (event) => {
    const selectedBankName = event.target.value;
    const bank = allBanksAcc.find((bank) => bank.bank_name === selectedBankName);
    setSelectedBank(bank);
  };

  const getMerchantBankList = async () => {
    try {
      const { data } = await apiHandle.get(`/bank-account-by-username/${merchantName}`);
      console.log("merchant daata ====> ", data.data[0].bank_accounts);
      setMerchantBankList(data.data[0].bank_accounts);
    } catch (error) {
      errorMsg(error?.response?.data?.message || 'Something went wrong!')
      console.log(error);
    }
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

                <Stack direction="column" spacing={1}>
                  <Typography variant="body1" color="initial">Enter Merchant Name</Typography>
                  <TextField
                    id="merchantName"
                    value={merchantName}
                    onChange={handleMerchantNameChange}
                  />
                  <Button onClick={getMerchantBankList} variant="outlined" color="primary">
                    Find Merchant Bank
                  </Button>
                </Stack>

                <Field
                  as={FormControl}
                  fullWidth
                  margin="dense"
                >
                  <Typography variant="body1">Select Merchant Bank Name</Typography>
                  <Field
                    as={Select}
                    labelId="merchantBankName-label"
                    id="merchantBankName"
                    name="merchantBankName"
                    value={selectedMerchantBank.bank_name}
                    placeholder="Merchant Bank Name"
                    variant="outlined"
                    onChange={handleMerchantBankSelect}
                  >
                    {
                      merchantBankList.map((bank) => (
                        <MenuItem key={bank._id} value={bank.bank_name}>
                          {bank.bank_name}
                        </MenuItem>
                      ))
                    }
                  </Field>
                </Field>
                <ErrorMessage name="merchantBankName" component="div" style={{ color: "red" }} />


                {selectedMerchantBank && (
                  <>
                    <Field
                      as={TextField}
                      margin="dense"
                      id="accountNumber"
                      name="accountNumber"
                      placeholder="Account Number"
                      variant="outlined"
                      fullWidth
                      value={selectedMerchantBank._id}
                      disabled
                    />
                  </>
                )}


                <Field
                  as={FormControl}
                  fullWidth
                  margin="dense"
                >
                  <Typography variant="body1">Select Customer Bank Name</Typography>
                  <Field
                    as={Select}
                    labelId="customerBankName-label"
                    id="customerBankName"
                    name="customerBankName"
                    value={selectedBank.bank_name}
                    placeholder="Customer Bank Name"
                    variant="outlined"
                    onChange={handleCustomerBankSelect}
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
                <ErrorMessage name="customerBankName" component="div" style={{ color: "red" }} />

                {selectedBank && (
                  <>
                    <Field
                      as={TextField}
                      margin="dense"
                      id="accountNumber"
                      name="accountNumber"
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
                    Pay Now
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

export default InstantPayments;
