import React from 'react';
import {Box, Container, Divider, Grid, Paper, Typography} from "@material-ui/core";

export const CartComponent = () => {
  // const cart = useSelector(CART_SELECTOR.cart);
  // const shoppingItems = useMemo(() => cart?.shoppingCartItemList || [], [cart]);
  // const cartItemsCount = useMemo(() => {
  //   return shoppingItems.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
  // }, [shoppingItems]);

  return (
    <Container maxWidth={"md"}>
      <Box marginTop={10}>
        <Paper elevation={1}>
          <Box paddingY={5} paddingX={6}>
            <Box paddingY={2} textAlign="center">
              <Typography variant={"h4"} gutterBottom>
                Shopping Cart
              </Typography>
            </Box>
            <Divider/>
            <Box paddingTop={4}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Box minHeight={500} bgcolor="white">

                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box minHeight={500} bgcolor="secondary.main">

                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
