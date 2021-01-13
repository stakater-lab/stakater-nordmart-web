import React, {useEffect} from 'react';
import {Box, BoxProps, Container, Grid, styled, Typography} from "@material-ui/core";
import suppliesBg from "../../../assets/img/supplies.jpg";
import {store} from "../../shared/redux/store";
import {GetProductsAction, STORE_SELECTORS} from "./store.redux";
import {useSelector} from "react-redux";
import {ProductComponent} from "./product-component";

export const StoreComponent = () => {
  const products = useSelector(STORE_SELECTORS.products);

  useEffect(() => {
    store.dispatch(new GetProductsAction());
  }, []);

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
            {products.map(p => (
              <Grid item xs={12} md={6} lg={4} key={p.itemId}>
                <ProductComponent product={p}/>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

interface IBackground extends BoxProps {
  src: string;
}

const Background = styled(({src, ...rest}: IBackground) => <Box {...rest}/>)((props: any) => ({
  backgroundImage: `url(${props.src})`,
  backgroundPosition: "center center",
  backgroundSize: "auto",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "scroll"
}));
