import {Product} from "./Product";
import {PaperBox} from "../../shared/PaperBox";
import {Box, Divider, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import React, {useMemo} from "react";
import {Background} from "./background";
import {getProductRatingsAPI} from "./store.service";
import {useAPI} from "./useAPI";
import {IMAGE_MAP} from "./product-images";
import {AddProduct} from "../cart/add-product";
import {useHistory} from "react-router";

interface IProductProps {
  product: Product;
}

export const ProductComponent = ({product}: IProductProps) => {
  const history = useHistory();
  const $ratings = useMemo(() => getProductRatingsAPI(product.itemId), [product.itemId]);
  const [ratings] = useAPI($ratings, []);
  const avrRating = useMemo(() => ratings.reduce((previousValue, currentValue) => previousValue + currentValue.rating, 0) / ratings.length, [ratings]);

  const showHighlight = () => {
    history.push(`/store/${product.itemId}`);
  }

  return (
    <PaperBox paddingX={4} paddingY={6} overflow="hidden">
      <Box minWidth={300} minHeight={500}>
        <Background src={IMAGE_MAP[product.name]} width="100%" minHeight={300} onClick={showHighlight}/>

        <Box marginY={5}>
          <Divider/>
        </Box>

        <Box textAlign="center" marginBottom={1}>
          <Rating value={avrRating} readOnly/>

          <Typography variant={"h6"}>
            {product?.name}
          </Typography>
        </Box>

        <Box height={50} textOverflow="ellipsis">
          <Typography variant={"subtitle2"}>
            {product?.description}
          </Typography>
        </Box>

        <Box marginTop={4}>
          <AddProduct product={product}/>
        </Box>
      </Box>
    </PaperBox>
  )
}
