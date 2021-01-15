import React from 'react';
import {Box, Container, Paper, Typography} from "@material-ui/core";

export const CheckoutComponent = () => {
  return (
    <>
      <Paper>
        <Container maxWidth={"md"}>
          <Box padding={10} textAlign="center">
            <Typography variant={"h4"}>
              Check Out
            </Typography>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth={"lg"}>
        <Box padding={10}>
          
        </Box>
      </Container>
    </>
  );
};
