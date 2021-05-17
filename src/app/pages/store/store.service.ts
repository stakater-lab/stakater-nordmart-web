import { catchError, map } from "rxjs/operators";
import { deserialize } from "../../shared/decorators/property-mapper";
import { Product } from "./Product";
import { Observable, of } from "rxjs";
import { httpClient } from "../../shared/services/client";
import { API } from "../../shared/services/api";
import { ProductRating } from "./ProductRating";
import {Promotion} from "./Promotion";

export const getProductsAPI = (): Observable<Product[]> => {
  return httpClient.get(API.products).pipe(map((result) => result.response?.map((p: any) => deserialize(Product, p))));
};

export const getProductRatingsAPI = (productId: string): Observable<ProductRating[]> => {
  return httpClient
    .get(API.productRatings, { params: { productId } })
    .pipe(map((result) => result.response?.map((r: any) => deserialize(ProductRating, r))));
};

export const getProductPromotionAPI = (productId: string): Observable<Promotion> => {
  return httpClient.get(API.productPromotion, { params: { productId } }).pipe(
    map((result) => {
      return deserialize(Promotion, result.response);
    }),
  );
};

export const productSearchAPI = (query: string = ""): Observable<Product[]> => {
  return httpClient.get(API.productSearch, { queryParams: { criteria: query } }).pipe(
    map((results) => results.response.products?.map((p: any) => deserialize(Product, p))),
    catchError(() => of([])),
  );
};
