import React, { useEffect, useState } from "react";
import PaymentsTable from "../../../../components/CustomTable";
import TabHeading from "../../../../components/TabHeading";
import { Stack } from "@mui/material";
import { apiHandle } from "../../../../config/apiHandle/apiHandle";
import CustomLoader from "../../../../components/CustomLoader";
import { errorMsg } from "../../../../utlis/common";

const MerchantCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllCustomers = async () => {
    try {
      setLoading(true);
      const response = await apiHandle.get("/merchant/customers");
      console.log("data ===> ", response.data.data);
      setCustomers(response.data.data);
      setLoading(false);
    } catch (error) {
      errorMsg(error.response.data.message || "Transaction List request failed")
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  if (loading) {
    return <CustomLoader />;
  }

  const columns = [
    { field: "username", headerName: "Username" },
    { field: "phone_number", headerName: "Phone Number" },
    { field: "user_role", headerName: "Role" },
    { field: "default_account_bank_name", headerName: "Default Account" },
    { field: "account_number", headerName: "Account Number" },
  ];

  const rows = customers.map((customer) => ({
    ...customer,
    default_account_bank_name: customer.user_default_account ? customer.user_default_account.bank_name : "N/A",
    account_number: customer.user_default_account ? customer.user_default_account.account_number : "N/A",
  }));

  return (
    <>
      <TabHeading heading="Customers" />
      <Stack padding={3}>
        <PaymentsTable rows={rows} columns={columns} />
      </Stack>
    </>
  );
};

export default MerchantCustomers;
