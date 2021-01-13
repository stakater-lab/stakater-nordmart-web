import React from "react";
import {Redirect, Route, Switch} from "react-router";
import {HashRouter} from "react-router-dom";
import {NotFound} from "./404";
import {TopMenu} from "./navigation/top-menu";
import {StoreComponent} from "./pages/store/store-component";
import {CartComponent} from "./pages/cart/cart-component";

export const App = () => {
  return (
    <HashRouter>
      <TopMenu/>

      <Switch>
        <Redirect exact from="/" to="/store"/>

        <Route exact path="/store">
          <StoreComponent/>
        </Route>

        <Route path="/cart">
          <CartComponent/>
        </Route>

        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default App;
