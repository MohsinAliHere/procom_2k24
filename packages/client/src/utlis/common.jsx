import React from "react";
import {
  CustomerSetting,
  InstantPayments,
  Payments,
  QrScan,
} from "../Pages/Dashboard/DashboardPages/CustomerPages";
import { FaQrcode } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosSettings } from "react-icons/io";

import Home from "../Pages/Dashboard/DashboardPages/MerchantPages/Main";
import { MerchantCustomers, MerchantPayment, Report } from "../Pages/Dashboard/DashboardPages/MerchantPages";
import MerchantPaymentRequest from "../Pages/Dashboard/DashboardPages/MerchantPages/MerchantPaymentRequest";
import { IoPeople } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdRequestQuote } from "react-icons/md";
import toast from "react-hot-toast";
import Main from "../Pages/Dashboard/DashboardPages/MerchantPages/Main";

const customerPages = [
  {
    link: "/",
    icons: <FaDollarSign size="25" />,
    title: "Payments",
    element: <Payments />,
  },
  {
    link: "/instantPayments",
    icons: <MdPayments size="25" />,
    title: "Instant Payments",
    element: <InstantPayments />,
  }
  ,
  // {
  //   link: "/qrScan",
  //   icons: <FaQrcode size="25" />,
  //   title: "Qr Scan",
  //   element: <QrScan />,
  // },
  ,
  {
    link: "/setting",
    icons: <IoIosSettings size="25" />,
    title: "Bank Accounts",
    element: <CustomerSetting />,
  },
];

const merchantPages = [
  // {
  //   title: "Dashboard",
  //   link: "/",
  //   icons: <LuLayoutDashboard size="25" />,
  //   element: <Main />,
  // },
  {
    title: "Payment",
    link: "/payment",
    icons: <FaDollarSign size="25" />,
    element: <MerchantPayment />,
  },
  ,
  {
    title: "Customers",
    link: "/customers",
    icons: <IoPeople size="25" />,
    element: <MerchantCustomers />,
  },
  ,
  {
    title: "Payment Requets",
    link: "/paymentRequets",
    icons: <MdRequestQuote size="25" />,
    element: <MerchantPaymentRequest />,
  },
  ,
  {
    title: "Report",
    link: "/report",
    icons: <HiOutlineDocumentReport size="25" />,
    element: <Report />,
  },
];


const roleMatch = Object.freeze({
  customer: "customer",
  merchant: "merchant",
})


const successMsg = (msg) => {
  return toast.success(msg)
}
const errorMsg = (msg) => {
  return toast.error(msg)
}


export { customerPages, merchantPages, roleMatch, successMsg, errorMsg };
