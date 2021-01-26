import {Product} from "./Product";
import {useMemo} from "react";
import {getProductPromotionAPI} from "./store.service";
import {of} from "rxjs";
import {useAPI} from "./useAPI";

export function usePromotion(product?: Product) {
  const $promotion = useMemo(() => product ? getProductPromotionAPI(product?.itemId) : of(undefined), [product]);
  const [promo] = useAPI($promotion, undefined);

  return promo;
}
