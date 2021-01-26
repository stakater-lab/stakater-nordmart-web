import React, {useEffect} from 'react';
import {Box, Container, Link, Paper, Typography} from "@material-ui/core";
import {CheckCircleOutline} from "@material-ui/icons";
import {useHistory} from "react-router";

export const CheckoutComponent = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/store");
    }, 5000)
  }, []);

  return (
    <Container maxWidth={"md"}>
      <Box padding={15} textAlign="center">
        <Paper elevation={1}>
          <Box padding={4}>
            <Box color="success.main">
              <CheckCircleOutline fontSize="large"/>
            </Box>
            <Typography variant={"h4"} gutterBottom>
              Checkout completed
            </Typography>

            <Typography variant={"h6"} color={"textSecondary"}>
              Thank you for your order!
            </Typography>

            <Link color={"secondary"} href="/#/store">Back to store</Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
