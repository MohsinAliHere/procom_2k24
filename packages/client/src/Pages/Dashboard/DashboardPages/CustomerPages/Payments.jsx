import React, { useEffect, useState } from 'react'
import CustomBox from '../../../../components/CustomBox'
import { Box, Chip, Stack, Typography } from '@mui/material'
import PaymentsTable from '../../../../components/CustomTable'
import TabHeading from '../../../../components/TabHeading'
import CustomLoader from '../../../../components/CustomLoader'
import { errorMsg, successMsg } from '../../../../utlis/common'
import { apiHandle } from '../../../../config/apiHandle/apiHandle'
const Payments = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionSum, settransactionSum] = useState([])
  const getAllTransactions = async () => {
    try {
      setLoading(true);
      const res = await apiHandle.get("/customer/transactions");
      const transactions = await apiHandle.get("/customer/transaction-sum-amount");
      console.log("data ===> ", transactions.data.data      );
      settransactionSum(transactions.data.data)
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
  const rejectedCount = customers.filter(customer => customer.status === "Rejected").length;
  const pendingCount = customers.filter(customer => customer.status === "Pending").length;
  const rows = customers.map((customer) => ({
    ...customer,
    amount: customer.amount + " PKR",
    merchantNumber: customer.merchant_bank_account ? customer.merchant_bank_account.account_number : "N/A",
    bank_name: customer.merchant_bank_account ? customer.merchant_bank_account.bank_name : "N/A",
    username: customer.customer_details ? customer.customer_details.username : "N/A",
    _id: customer._id
  }));
  const columns = [
    { field: "merchantNumber", headerName: "Merchant Number" },
    { field: "status", headerName: "Status" },
    { field: "purpose", headerName: "Description" },
    { field: "createdAt", headerName: "Time" },
    { field: "createdAt", headerName: "Date" },
    { field: "amount", headerName: "Amount" },
    { field: "action", headerName: "Action" },
  ];
  return (
    <>
      <TabHeading heading="Payments" />
      <Stack padding={3} >
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
export default Payments