import React, {useEffect} from "react";
import {Box, Container, Grid} from "@material-ui/core";
import {store} from "../../shared/redux/store";
import {GetProductsAction, STORE_SELECTORS} from "../store/store.redux";
import {useSelector} from "react-redux";
import {ProductComponent} from "../store/product-component";
import {Route, useHistory} from "react-router";
import {ProductHighlight} from "../store/product-highlight";
import {ProductSearch} from "../search/product-search";

export const ProductCatalog = () => {
  const history = useHistory();
  const products = useSelector(STORE_SELECTORS.products);

  const closeHighLight = () => {
    history.push("/store");
  };

  useEffect(() => {
    store.dispatch(new GetProductsAction());
  }, []);

  return (
    <>
      <Container maxWidth={"lg"}>
        <Box textAlign="center" paddingY={5} paddingX={10} bgcolor="white" marginY={1}>
          <ProductSearch/>
        </Box>

        <Box>
          <Grid container spacing={1}>
            {products.map((p) => (
              <Grid item xs={12} md={6} lg={4} key={p.itemId}>
                <ProductComponent product={p}/>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Route exact path={`/store/:productId`}>
        <ProductHighlight onClose={closeHighLight}/>
      </Route>
    </>
  );
};
