import React from "react";
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@material-ui/core";
import StakaterLogo from "../../assets/img/stakater-icon.svg";
import {AccountCircle, ExitToApp, Store} from "@material-ui/icons";
import {ProductSearch} from "../pages/search/product-search";
import {authService} from "../auth/keycloak.service";
import {store} from "../shared/redux/store";
import {LoginAction, LogOutAction} from "../auth/auth.redux";
import {AppNotification} from "../notifications/notification";
import {NavMenu} from "./NavMenu";
import {CartMenu} from "../pages/cart/cart-menu";

export const TopMenu = () => {
  const login = () => {
    store.dispatch(new LoginAction());
  }

  const logout = () => {
    store.dispatch(new LogOutAction());
  }

  return (
    <AppBar>
      <AppNotification/>
      <Container>
        <Toolbar>
          <Box display="flex" marginRight="auto">
            <StakaterLogo height={24}/>
            <Typography variant={"h5"}>Stakater</Typography>
            <Typography variant={"caption"}>Nordmart</Typography>
          </Box>

          <Box color="white" marginRight={1}>
            <ProductSearch/>
          </Box>

          <NavMenu menu={{
            name: "Shop",
            icon: <Store color={"inherit"}/>,
            path: "/store"
          }}/>

          <CartMenu/>

          <Box color="white">
            {authService.keyCloak?.authenticated ? (
              <Button color={"inherit"} onClick={logout}>
                <ExitToApp/>
                Logout
              </Button>
            ) : (
              <Button color={"inherit"} onClick={login}>
                <AccountCircle/>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
