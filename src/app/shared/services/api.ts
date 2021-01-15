/* tslint:disable:max-line-length */
declare const SECURE_GW_ENDPOINT: string;
declare const PRODUCTION: string;
const origin = PRODUCTION ? new URL(SECURE_GW_ENDPOINT).origin : "";
export const API = {
  products: `${origin}/api/products`,
  productRatings: `${origin}/api/review/{productId}`,
  productSearch: `${origin}/api/v1/product-search`,
  productInventory: `${origin}/api/inventory/{productId}`,
  shoppingCart: `${origin}/api/cart/{cartId}`
};
