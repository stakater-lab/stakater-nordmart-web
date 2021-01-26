import React, {useEffect} from "react";
import {Redirect, Route, Switch} from "react-router";
import {HashRouter} from "react-router-dom";
import {NotFound} from "./404";
import {TopMenu} from "./navigation/top-menu";
import {ProductCatalog} from "./pages/catalog/product-catalog";
import {CheckoutComponent} from "./pages/checkout/checkout-component";
import {store} from "./shared/redux/store";
import {GetCartAction} from "./pages/cart/cart.redux";
import {CartComponent} from "./pages/cart/cart-component";

export const App = () => {
  useEffect(() => {
    store.dispatch(new GetCartAction())
  }, []);
  return (
    <HashRouter>
      <TopMenu/>

      <Switch>
        <Redirect exact from="/" to="/store"/>

        <Route path="/store">
          <ProductCatalog/>
        </Route>

        <Route path="/cart">
          <CartComponent/>
        </Route>

        <Route path="/checkout/completed">
          <CheckoutComponent/>
        </Route>

        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default App;
