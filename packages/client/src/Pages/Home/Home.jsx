import React from "react";
import { Container, Stack, Grid, Typography, Button, TextField } from "@mui/material";
import HomeBanner from "../../assets/homeBanner.png";
import HomeBanner1 from "../../assets/homeBanner1.png";
import HomeBanner2 from "../../assets/Finance leaders.gif";
import "./Home.css"
import { Link } from "react-router-dom";
import { IoWallet } from "react-icons/io5";
import Navbar from "../../components/Navbar";
const Home = () => {
  return (

   <>
   <Navbar/>
   <Stack sx={{ overflow: "hidden" }}>
      <Container>
        <Grid my={8} container justifyContent="center" alignItems="center" spacing={0}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Stack
              spacing={2}
              direction="column"
              justifyContent="start"
              alignItems="start"
            >
              <Typography fontWeight="bold" variant="h3">
                Optimize business <br /> payment
              </Typography>
              <Typography variant="h6">
                Payment processing platform that facilitates transactions
                between businesses and their customers.
              </Typography>
              <Button size="large" sx={{ color: "#744FEA" }} variant="text">
                Open Account
              </Button>
            </Stack>
          </Grid>
          <Grid className="animate__animated animate__backInRight" item xs={12} sm={12} md={6} lg={6}>
            <Stack>
              <img width="80%" src={HomeBanner} alt="" />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid my={8} container justifyContent="center" alignItems="center" spacing={0}>
          <Grid className="animate__animated animate__backInLeft" item xs={12} sm={12} md={6} lg={6}>
            <Stack>
              <img width="80%" src={HomeBanner1} alt="" />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Stack
              spacing={2}
              direction="column"
              justifyContent="start"
              alignItems="start"
            >
              <Typography fontWeight="bold" variant="h3">
                YOU CAN <br />{" "}
                <span
                  style={{
                    color: "Red",
                  }}
                >
                  Monitor
                </span>{" "}
                payments
              </Typography>
              <Typography variant="h6"></Typography>
              View real-time updates on successful payments, refunds, and other
              transaction-related activities
              <Button size="large" sx={{ color: "Red" }} variant="text">
                Learn more
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid my={8} container justifyContent="center" alignItems="center" spacing={0}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Stack
              spacing={2}
              direction="column"
              justifyContent="start"
              alignItems="start"
            >
              <Typography fontWeight="bold" variant="h3">
                YOU CAN <br /> <span style={{
                  color: "#744FEA"
                }} >Manage</span> customers
              </Typography>
              <Typography variant="h6">
                View real-time updates on successful payments, refunds, and
                other transaction-related activities .
              </Typography>
              <Button size="large" sx={{ color: "#744FEA" }} variant="text">
                Learn more
              </Button>
            </Stack>
          </Grid>
          <Grid className="animate__animated animate__backInRight" item xs={12} sm={12} md={6} lg={6}>
            <Stack>
              <img width="80%" src={HomeBanner2} alt="" />
            </Stack>
          </Grid>
        </Grid>
      </Container>



      <Container>
      <Typography variant="h3"my={3} sx={{
        borderBottom:"2px solid #744FEA",
        width:"auto",
      }} fontWeight="bolder" textAlign="center" >Pricing</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} >
            <Stack className="customBox animate__animated animate__flipInX" sx={{ backgroundColor: "#FAFAFA", padding: "50px", borderRadius: "10px" }} spacing={2} direction="column" alignItems="center" justifyContent="center" >
              <Typography className="activeText" fontWeight="bolder" variant="h4" >PERSONAL</Typography>
              <Typography variant="body1" >Perfect for side or hobby projects
              </Typography>
              <Typography variant="label" > <span style={{
                fontWeight: "bolder",
                fontSize: "70px",
              }} >4% </span> Service fee / Payment
              </Typography>
              <Stack direction="column" alignItems="center" justifyContent="center" my={2} >
                <Typography variant="body1" >Process Unlimited Payments
                </Typography>
                <Typography variant="body1" >Activate Three Business Services
                </Typography>
                <Typography variant="body1" >
                   Analyze and Predict Financial Trends
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} >
            <Stack className="customBox animate__animated animate__flipInX" sx={{ backgroundColor: "#FAFAFA", padding: "50px", borderRadius: "10px" }} spacing={2} direction="column" alignItems="center" justifyContent="center" >
              <Typography className="activeText" fontWeight="bolder" variant="h4" >STARTUP</Typography>
              <Typography variant="body1" >Perfect for side or hobby projects
              </Typography>
              <Typography variant="label" > <span style={{
                fontWeight: "bolder",
                fontSize: "70px",
              }} >5% </span> Service fee / Payment
              </Typography>
              <Stack direction="column" alignItems="center" justifyContent="center" my={2} >
                <Typography variant="body1" >Process Unlimited Payments
                </Typography>
                <Typography variant="body1" >Activate Three Business Services
                </Typography>
                <Typography variant="body1" >
                  Analyze and Predict Financial Trends
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} >
            <Stack className="customBox animate__animated animate__flipInX" sx={{ backgroundColor: "#FAFAFA", padding: "50px", borderRadius: "10px" }} spacing={2} direction="column" alignItems="center" justifyContent="center" >
              <Typography className="activeText" fontWeight="bolder" variant="h4" >ORGANIZTION</Typography>
              <Typography variant="body1" >Perfect for side or hobby projects
              </Typography>
              <Typography variant="label" > <span style={{
                fontWeight: "bolder",
                fontSize: "70px",
              }} >150 $ </span> / Month
              </Typography>
              <Stack direction="column" alignItems="start" justifyContent="center" my={2} >
                <Typography variant="body1" >Process Unlimited Payments
                </Typography>
                <Typography variant="body1" >Activate Three Business Services
                </Typography>
                <Typography variant="body1" >
                   Analyze and Predict Financial Trends
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

      </Container>


      <>

        <Stack sx={{ backgroundColor: '#f5f5f5', marginTop: "40px" }}>
          <Container >
            <Grid sx={{ padding: '50px', }} container spacing={2}>
              <Grid item xs={12} md={3}>
                <Stack direction="column" my={2} justifyContent="start" spacing={1} alignItems="start">
                  <IoWallet
                    color={"#744FEA"}
                    size={50}
                  />
                  <Typography fontWeight="bolder" variant="h5">
                    Customer Portal
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography fontWeight="bold" variant="h5">
                  Product
                </Typography>
                <Stack direction="column" spacing={1} >
                  <Typography fontWeight="light" variant="h6">
                    Services
                  </Typography>
                  <Typography fontWeight="light" variant="h6">
                    Solutions
                  </Typography>
                  <Typography fontWeight="light" variant="h6">

                    Pricing
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography fontWeight="bold" variant="h5">
                  Resources
                </Typography>
                <Stack direction="column" spacing={1} >
                  <Typography fontWeight="light" variant="h6">
                    Services
                  </Typography>
                  <Typography fontWeight="light" variant="h6">
                    Solutions
                  </Typography>
                  <Typography fontWeight="light" variant="h6">

                    Pricing
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack direction="column" spacing={1} >

                  <Typography color="#744fea" variant="h6">
                    Subscribe Our Newsletter:
                  </Typography>
                  <TextField
                    label="Email Address"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                  <Button variant="contained" sx={{
                    backgroundColor:"#744FEA",
                    color:"white"
                  }} size="large" >
                    Subscribe
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Stack>
      </>



    </Stack>
   </>
  );
};

export default Home;
