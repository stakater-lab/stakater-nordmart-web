import React, {useMemo, useState} from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  ClickAwayListener,
  Divider, Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@material-ui/core";
import {Dropdown} from "../../navigation/dropdown";
import {ShoppingCart} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {CART_SELECTOR} from "./cart.redux";
import {IMAGE_MAP} from "../store/product-images";

export const CartMenu = () => {
  const cart = useSelector(CART_SELECTOR.cart);
  const shoppingItems = useMemo(() => cart?.shoppingCartItemList || [], [cart]);
  const cartItemsCount = useMemo(() => {
    return shoppingItems.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
  }, [shoppingItems]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <List disablePadding ref={setAnchorEl}>
        <ListItem button onClick={() => setOpen(!open)}>
          <Box marginRight={0.5}>
            <Badge badgeContent={cartItemsCount} color={"error"}>
              <ShoppingCart/>
            </Badge>
          </Box>

          <Typography color={"inherit"}>
            Cart
          </Typography>
        </ListItem>

        <Dropdown onClose={() => setOpen(false)} open={open} anchorEl={anchorEl}>
          {shoppingItems.length ? (
            <List style={{minWidth: 250}}>
              {shoppingItems.map(si => (
                <ListItem key={si.product.itemId}>
                  <ListItemAvatar>
                    <Avatar src={IMAGE_MAP[si.product.name]}/>
                  </ListItemAvatar>
                  <ListItemText primary={si.product.name} secondary={`${si.quantity} x ${si.product.price?.toFixed(2)}$`}/>
                  <ListItemSecondaryAction>
                    <b>{si.total?.toFixed(2)}$</b>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}

              <Divider/>

              <ListItem dense>
                <ListItemText primary="Item Costs"/>
                <ListItemSecondaryAction>
                  <b>{cart?.cartItemTotal?.toFixed(2)}$</b>
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem dense>
                <ListItemText primary="Shipping"/>
                <ListItemSecondaryAction>
                  <b>{cart?.shippingTotal?.toFixed(2)}$</b>
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem dense>
                <ListItemText primary="Promotion"/>
                <ListItemSecondaryAction>
                  <b>-{cart?.cartItemPromoSavings?.toFixed(2)}$</b>
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem dense>
                <ListItemText>
                  <b>Total</b>
                </ListItemText>
                <ListItemSecondaryAction>
                  <b>{cart?.cartTotal?.toFixed(2)}$</b>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider/>
              <ListItem onClick={() => setOpen(false)}>
                <Box display="flex" width="100%" justifyContent="flex-end">
                  <Link underline={"none"} href="/#/cart">
                    <Button variant={"contained"} color={"secondary"}>
                      View Cart
                    </Button>
                  </Link>
                </Box>
              </ListItem>
            </List>
          ) : (
            <ListItem>
              <ListItemText>
                <Box textAlign="center">
                  <Typography color={"textSecondary"}>
                    Cart is empty
                  </Typography>
                </Box>
              </ListItemText>
            </ListItem>
          )}
        </Dropdown>
      </List>
    </ClickAwayListener>
  );
};
