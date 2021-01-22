import {Cart} from "./Cart";
import {httpClient} from "../../shared/services/client";
import {Observable} from "rxjs";
import {API} from "../../shared/services/api";
import {map} from "rxjs/operators";
import {deserialize} from "../../shared/decorators/property-mapper";
import {authService} from "../../auth/keycloak.service";
import {Product} from "../store/Product";

export const CART_STORAGE_KEY = "cartId";
export const getCartID = () => {
  const cartId = localStorage.getItem(CART_STORAGE_KEY) || authService.userInfo?.sub || `id-${Date.now().toString(16)}`;

  if (!localStorage.getItem(CART_STORAGE_KEY) && !authService.userInfo?.sub) {
    localStorage.setItem(CART_STORAGE_KEY, cartId);
  }

  return cartId;
};

export const getCartActionAPI = (cartId: string = getCartID()): Observable<Cart> => {
  return httpClient.get(API.shoppingCart, {params: {cartId}})
    .pipe(map(result => deserialize(Cart, result.response)));
};

export const addToCartAPI = (cartId: string, item: Product, quantity: number): Observable<Cart> => {
  const api = API.shoppingCart + "/{productId}/{quantity}"
  return httpClient.post(api, undefined, {params: {cartId, productId: item.itemId, quantity: quantity + ""}})
    .pipe(map(result => deserialize(Cart, result.response)));
};

export const removeFromCartAPI = (cartId: string, item: Product, quantity: number): Observable<Cart> => {
  const api = API.shoppingCart + "/{productId}/{quantity}"
  return httpClient.delete(api, {params: {cartId, productId: item.itemId, quantity: quantity + ""}})
    .pipe(map(result => deserialize(Cart, result.response)));
};

export const checkoutAPI = (cartId: string) => {
  return httpClient.post(API.checkout, {}, {params: {cartId}});
};

