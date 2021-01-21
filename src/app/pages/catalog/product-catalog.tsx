import React, { useEffect } from "react";
import { Box, BoxProps, Container, Grid, styled, Typography } from "@material-ui/core";
import suppliesBg from "../../../assets/img/supplies.jpg";
import { store } from "../../shared/redux/store";
import { GetProductsAction, STORE_SELECTORS } from "../store/store.redux";
import { useSelector } from "react-redux";
import { ProductComponent } from "../store/product-component";
import { Route, useHistory } from "react-router";
import { ProductHighlight } from "../store/product-highlight";
import { from } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getProductPromotionAPI } from "../store/store.service";
import { Product } from "../store/Product";

export const ProductCatalog = () => {
  const history = useHistory();
  const products = useSelector(STORE_SELECTORS.products);

  const closeHighLight = () => {
    history.push("/store");
  };

  useEffect(() => {
    store.dispatch(new GetProductsAction());
  }, []);

  useEffect(() => {
    const sub = from(products)
      .pipe(mergeMap((p: Product) => getProductPromotionAPI(p.itemId)))
      .subscribe(console.log);
    return () => {
      sub.unsubscribe();
    };
  }, [products]);

  return (
    <>
      <Background src={suppliesBg}>
        <Container maxWidth={"md"}>
          <Box padding={10} textAlign="center" color="white">
            <Typography variant={"h4"} color={"inherit"}>
              Inventory
            </Typography>
          </Box>
        </Container>
      </Background>

      <Container maxWidth={"lg"}>
        <Box padding={10}>
          <Grid container spacing={1}>
            {products.map((p) => (
              <Grid item xs={12} md={6} lg={4} key={p.itemId}>
                <ProductComponent product={p} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Route exact path={`/store/:productId`}>
        <ProductHighlight onClose={closeHighLight} />
      </Route>
    </>
  );
};

interface IBackground extends BoxProps {
  src: string;
}

const Background = styled(({ src, ...rest }: IBackground) => <Box {...rest} />)((props: any) => ({
  backgroundImage: `url(${props.src})`,
  backgroundPosition: "center center",
  backgroundSize: "auto",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "scroll",
}));
