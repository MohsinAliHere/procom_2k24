import React, { useEffect, useState } from 'react'
import CustomBox from '../../../../components/CustomBox'
import { Box, Chip, Stack, Typography } from '@mui/material'
import PaymentsTable from '../../../../components/CustomTable'
import TabHeading from '../../../../components/TabHeading'
import CustomLoader from '../../../../components/CustomLoader'
import { apiHandle } from '../../../../config/apiHandle/apiHandle'
import { errorMsg, successMsg } from '../../../../utlis/common'
const MerchantPayment = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionSum, settransactionSum] = useState([])
  const getAllTransactions = async () => {
    try {
      setLoading(true);
      const res = await apiHandle.get("/merchant/transactions");
      const { data } = await apiHandle.get("/merchant/transaction-sum-amount");
      settransactionSum(data.data)
      console.log(data)
      setCustomers(res.data.data);
      successMsg(res.data.message || "Transaction List Fetched Successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorMsg(error.response.data.message || "Transaction List request failed")
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllTransactions();
  }, []);
  if (loading) {
    return <CustomLoader />;
  }
  const columns = [
    { field: "account_number", headerName: "Merchant Account Number" },
    { field: "status", headerName: "Status" },
    { field: "purpose", headerName: "Description" },
    { field: "bank_name", headerName: "Bank" },
    { field: "createdAt", headerName: "Date", type: 'date' },
    { field: "amount", headerName: "Amount", },
  ];
  const rows = customers.map((customer) => ({
    ...customer,
    amount: customer.amount + " PKR",
    account_number: customer.receiver_bank ? customer.receiver_bank.account_number : "N/A",
    bank_name: customer.receiver_bank ? customer.receiver_bank.bank_name : "N/A",
    username: customer.customer_details ? customer.customer_details.username : "N/A",
  }));
  return (
    <>
      <TabHeading heading="Payments" />
      <Stack padding={3}>
        <Stack direction="row" spacing={2} my={3}>
          <Stack direction="row" spacing={2} my={3} >
            <CustomBox heading="All Payments"
              payment={`${transactionSum?.total_amount} PKR`}
              color="##ebecff" />
            <CustomBox heading="Total Pending Records"
              payment={`${transactionSum?.pending_amount} PKR`}
              color="#EBFDFF" />
            <CustomBox heading="Total Paid Records"
              payment={`${transactionSum?.total_amount} PKR`}
              color="#D8FBF6" />
            <CustomBox heading="Total Reject Records"
              payment={`${transactionSum?.rejected_amount} PKR`}
              color="#FCF2F1" />
          </Stack>
        </Stack>
        <PaymentsTable rows={rows} columns={columns} />
      </Stack>
    </>
  )
}
export default MerchantPayment