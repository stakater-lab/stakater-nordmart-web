import React, {useMemo} from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid, Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  OutlinedInput,
  Paper,
  Typography, TypographyProps
} from "@material-ui/core";
import {useSelector} from "react-redux";
import {CART_SELECTOR, CheckoutAction, RemoveFromCartAction} from "./cart.redux";
import {IMAGE_MAP} from "../store/product-images";
import {Delete, RemoveShoppingCart} from "@material-ui/icons";
import {store} from "../../shared/redux/store";
import {Field, Form} from 'react-final-form';
import {Similar} from "../../typings";
import {CartItem} from "./Cart";
import {authService} from "../../auth/keycloak.service";
import {LoginAction} from "../../auth/auth.redux";
import {useHistory} from "react-router";

export const CartComponent = () => {
  const cart = useSelector(CART_SELECTOR.cart);
  const shoppingItems = useMemo(() => cart?.shoppingCartItemList || [], [cart]);
  const history = useHistory();

  const removeFromCart = (ci: Similar<CartItem>) => {
    if (!cart || !ci) {
      return;
    }

    store.dispatch(new RemoveFromCartAction(cart.cartId, ci.product, ci.quantity))
  }

  const checkout = () => {
    if(!cart?.cartId) {
      return;
    }

    if(authService.keyCloak.authenticated) {
      store.dispatch(new CheckoutAction(cart.cartId,() => {
        history.push("/checkout/completed")
      }))
    } else {
      store.dispatch(new LoginAction());
    }
  }

  return (
    <Container maxWidth={"lg"}>
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
                <Grid item xs={12} md={8}>
                  <Box minHeight={500} bgcolor="white">
                    <List>
                      {shoppingItems.map(si => (
                        <ListItem key={si.product.itemId}>
                          <ListItemAvatar>
                            <img height={100} src={IMAGE_MAP[si.product.name]}/>
                          </ListItemAvatar>

                          <ListItemText
                            primary={si.product.name}
                            secondary={`${si.quantity} x ${si.product.price?.toFixed(2)}$`}
                          />
                          <ListItemSecondaryAction>
                            <Box display="flex" alignItems="center">
                              <Box>
                                <b>{si.total?.toFixed(2)}$</b>
                                <br/>
                                {si.promoSavings > 0 && (
                                  <Typography color={"error"}>
                                    <b>
                                      -{si.promoSavings}$ <small style={{fontSize: 11}}>promotion</small>
                                    </b>
                                  </Typography>
                                )}
                              </Box>

                              <Box paddingX={3}>
                                <Form initialValues={{quantity: 1, product: si.product}} onSubmit={removeFromCart}>
                                  {({handleSubmit}) => (
                                    <form onSubmit={handleSubmit}>
                                      <Field name="quantity">
                                        {({input}) => (
                                          <Box display="flex" justifyContent={"stretch"} width={120}>
                                            <OutlinedInput type="number" {...input} inputProps={{
                                              min: 1,
                                              ...(si.quantity ? {max: si.quantity} : {})
                                            }}/>

                                            <Button type={"submit"} variant={"contained"} color={"default"}>
                                              <Delete color={"error"}/>
                                            </Button>
                                          </Box>
                                        )}
                                      </Field>
                                    </form>
                                  )}
                                </Form>
                              </Box>
                            </Box>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>

                    {shoppingItems.length < 1 && (
                      <Box textAlign="center" marginTop={10}>
                        <Typography color={"textSecondary"}>
                          <RemoveShoppingCart/>
                          <br/>
                          Cart is empty
                        </Typography>

                        <Link color={"secondary"} href="/#/store">Back to store</Link>
                      </Box>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box display="flex" flexDirection="column" height="100%" minHeight={500} bgcolor="primary.light" padding={4} color="white">
                    <Box display="flex" justifyContent="space-between" marginY={2}>
                      <Typography variant={"h6"}>
                        <b>Item total</b>
                      </Typography>

                      <Typography variant={"h6"}>
                        {cart?.cartItemTotal.toFixed(2)}$
                      </Typography>
                    </Box>

                    <Divider style={{backgroundColor: "white"}} variant={"fullWidth"}/>

                    <Box display="flex" justifyContent="space-between" marginY={2}>
                      <SubHeading variant={"h6"}>
                        Shipping total
                      </SubHeading>

                      <Typography variant={"h6"}>
                        {cart?.shippingTotal.toFixed(2)}$
                      </Typography>
                    </Box>

                    <Divider style={{backgroundColor: "white"}} variant={"fullWidth"}/>

                    <Box display="flex" justifyContent="space-between" marginY={2}>
                      <SubHeading variant={"h6"}>
                        Promo savings
                      </SubHeading>

                      <Typography variant={"h6"}>
                        {cart?.cartItemPromoSavings.toFixed(2)}$
                      </Typography>
                    </Box>
                    <Divider style={{backgroundColor: "white"}} variant={"fullWidth"}/>

                    <Box display="flex" justifyContent="space-between" marginY={2}>
                      <SubHeading variant={"h6"}>
                        Promo shipping savings
                      </SubHeading>

                      <Typography variant={"h6"}>
                        {cart?.shippingPromoSavings.toFixed(2)}$
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" marginY={6} marginTop="auto">
                      <Divider style={{backgroundColor: "white"}} variant={"fullWidth"}/>

                      <Typography variant={"h4"}>
                        Total
                      </Typography>

                      <Typography variant={"h4"}>
                        {cart?.cartTotal.toFixed(2)}$
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="center">
                      <Button size={"large"} variant={"contained"} color={"secondary"} onClick={checkout} disabled={!shoppingItems.length}>
                        <Typography variant={"h6"}>
                          {authService.keyCloak.authenticated ? "checkout" : "login to checkout"}
                        </Typography>
                      </Button>
                    </Box>
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

const SubHeading = (props: TypographyProps) => (
  <Typography {...props} variant={"h6"} style={{fontSize: 12}}/>
)
