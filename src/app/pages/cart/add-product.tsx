import React, {useMemo} from 'react';
import {Product} from "../store/Product";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import {AddShoppingCart, Check, Warning} from "@material-ui/icons";
import {API} from "../../shared/services/api";
import {httpClient} from "../../shared/services/client";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {useAPI} from "../store/useAPI";
import {store} from "../../shared/redux/store";
import {AddToCartAction, CART_SELECTOR} from "./cart.redux";
import {useSelector} from "react-redux";
import {ShowNotificationAction} from "../../notifications/notification.redux";
import {Field, Form} from 'react-final-form';

interface IAddProductProps {
  product?: Product;
}

export const AddProduct = ({product}: IAddProductProps) => {
  const cart = useSelector(CART_SELECTOR.cart);
  const $inventory = useMemo(() => product?.itemId ? productInventoryAPI(product.itemId) : of(null), [product]);
  const [availability] = useAPI($inventory, null);

  const addToCart = ({quantity}: any) => {
    if (!cart || !product || !quantity) {
      return;
    }

    store.dispatch(new AddToCartAction(cart?.cartId, product, quantity, () => {
      store.dispatch(new ShowNotificationAction({
        type: "success",
        message: "Item added",
        duration: 1000
      }))
    }));
  }

  return (
    <Box display="flex" justifyContent={"space-between"} alignItems={"center"}>
      <Form onSubmit={addToCart}>
        {({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" justifyContent={"stretch"} width={200}>
              <Field name="quantity" parse={v => Number(v)}>
                {({input}) => (
                  <TextField
                    variant={"outlined"}
                    type="number" placeholder="Quantity"
                    inputProps={{
                      min: 1,
                      ...(availability !== null ? {max: availability} : {})
                    }}
                    {...input}
                  />
                )}
              </Field>

              <Button type="submit" variant={"contained"} color={"secondary"} onClick={addToCart}>
                <AddShoppingCart/>
                ADD
              </Button>
            </Box>
          </form>
        )}
      </Form>

      <Box textAlign="center">
        <Typography color={"textSecondary"}>
          Inventory
        </Typography>
        {availability === null && (
          <Box color="error.main" display="flex" alignItems={"center"}>
            <Warning/>
            Unknown
          </Box>
        )}

        {availability === 0 && (
          <Box color="error.main" display="flex" alignItems={"center"}>
            <Warning/>
            Not Available
          </Box>
        )}

        {availability && availability > 0 && (
          <Box color="success.main" display="flex" alignItems={"center"}>
            <Check/>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const productInventoryAPI = (productId: string): Observable<number | null> => {
  return httpClient.get(API.productInventory, {params: {productId}})
    .pipe(map(results => results.response), catchError(err => of(null)));
};
