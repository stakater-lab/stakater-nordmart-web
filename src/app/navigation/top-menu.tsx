import React from "react";
import {AppBar, Badge, Box, Button, Container, Toolbar, Typography} from "@material-ui/core";
import StakaterLogo from "../../assets/img/stakater-icon.svg";
import {AccountCircle, ShoppingCart, Store} from "@material-ui/icons";
import {ProductSearch} from "../pages/store/product-search";

export const TopMenu = () => {
  return (
    <AppBar>
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

          <Box color="white" marginRight={1}>
            <Button color={"inherit"}>
              <Store/>
              Shop
            </Button>
          </Box>

          <Box color="white" marginRight={1}>
            <Badge badgeContent={4} color="error">
              <Button color={"inherit"}>
                <ShoppingCart/>
                Cart
              </Button>
            </Badge>
          </Box>

          <Box color="white">
            <Button color={"inherit"}>
              <AccountCircle/>
              Signin
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
