import { catchError, map } from "rxjs/operators";
import { deserialize } from "../../shared/decorators/property-mapper";
import { Product } from "./Product";
import { Observable, of } from "rxjs";
import { httpClient } from "../../shared/services/client";
import { API } from "../../shared/services/api";
import { ProductRating } from "./ProductRating";

export const getProductsAPI = (): Observable<Product[]> => {
  return httpClient.get(API.products).pipe(map((result) => result.response?.map((p: any) => deserialize(Product, p))));
};

export const getProductRatingsAPI = (productId: string): Observable<ProductRating[]> => {
  return httpClient
    .get(API.productRatings, { params: { productId } })
    .pipe(map((result) => result.response.body?.map((r: any) => deserialize(ProductRating, r))));
};

export const productSearchAPI = (query: string = ""): Observable<Product[]> => {
  return httpClient.get(API.productSearch, { queryParams: { criteria: query } }).pipe(
    map((results) => results.response.products?.map((p: any) => deserialize(Product, p))),
    catchError(() => of([])),
  );
};
