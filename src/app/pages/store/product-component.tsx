import {Product} from "./Product";
import {PaperBox} from "../../shared/PaperBox";
import {Badge, Box, Divider, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import React, {useMemo} from "react";
import {Background} from "./background";
import {getProductRatingsAPI} from "./store.service";
import {useAPI} from "./useAPI";
import {IMAGE_MAP} from "./product-images";
import {AddProduct} from "../cart/add-product";
import {useHistory} from "react-router";
import {usePromotion} from "./usePromotion";

interface IProductProps {
  product: Product;
}

export const ProductComponent = ({product}: IProductProps) => {
  const history = useHistory();
  const $ratings = useMemo(() => getProductRatingsAPI(product.itemId), [product.itemId]);
  const [ratings] = useAPI($ratings, []);
  const avrRating = useMemo(() => ratings.reduce((previousValue, currentValue) => previousValue + currentValue.rating, 0) / ratings.length, [ratings]);
  const promotion = usePromotion(product);

  const showHighlight = () => {
    history.push(`/store/${product.itemId}`);
  }

  return (
    <PaperBox paddingX={4} paddingY={6} overflow="hidden">
      <Badge
        style={{width: "100%"}}
        color={"error"}
        badgeContent={promotion?.active ? `${promotion?.percentOff}%` : undefined}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
      <Box minWidth={300} minHeight={500} width="100%">
        <Background src={IMAGE_MAP[product.name]} minHeight={300} onClick={showHighlight}/>

        <Box marginY={5}>
          <Divider/>
        </Box>

        <Box textAlign="center" marginBottom={1}>
          <Typography variant={"h4"}>
            {product.price}$
          </Typography>

          <br/>

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
      </Badge>
    </PaperBox>
  )
}
