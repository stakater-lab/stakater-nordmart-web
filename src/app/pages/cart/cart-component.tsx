import React from 'react';
import {Box, Container, Paper, Typography} from "@material-ui/core";

export const CartComponent = () => {
  return (
    <Paper>
      <Container maxWidth={"md"}>
        <Box padding={10} textAlign="center">
          <Typography variant={"h4"}>
            Cart
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};
