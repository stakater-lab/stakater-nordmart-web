import {Product} from "./Product";
import {PaperBox} from "../../shared/PaperBox";
import {Box, Divider, Typography} from "@material-ui/core";
import img1 from "../../../assets/img/products/Solid Performance Polo.jpg";
import {Rating} from "@material-ui/lab";
import React, {useMemo} from "react";
import img2 from "../../../assets/img/products/16 oz. Vortex Tumbler.jpg";
import img3 from "../../../assets/img/products/Forge Laptop Sticker.jpg";
import img4 from "../../../assets/img/products/Lytro Camera.jpg";
import img5 from "../../../assets/img/products/Oculus Rift.jpg";
import img6 from "../../../assets/img/products/Ogio Caliber Polo.jpg";
import img7 from "../../../assets/img/products/Pebble Smart Watch.jpg";
import {Background} from "./background";
import {getProductRatingsAPI} from "./store.service";
import {useAPI} from "./useAPI";

const imageMap: any = {
  "Solid Performance Polo": img1,
  "16 oz. Vortex Tumbler": img2,
  "Forge Laptop Sticker": img3,
  "Lytro Camera": img4,
  "Oculus Rift": img5,
  "Ogio Caliber Polo": img6,
  "Pebble Smart Watch": img7
}

interface IProductProps {
  product: Product;
}

export const ProductComponent = ({product}: IProductProps) => {
  const $ratings = useMemo(() => getProductRatingsAPI(product.itemId), [product.itemId]);
  const [ratings] = useAPI($ratings, []);
  const avrRating = useMemo(() => ratings.reduce((previousValue, currentValue) => previousValue + currentValue.rating, 0) / ratings.length, [ratings]);

  return (
    <PaperBox paddingX={4} paddingY={6} overflow="hidden">
      <Box minWidth={300} minHeight={500}>
        <Background src={imageMap[product.name]} width="100%" minHeight={300}/>

        <Box marginY={5}>
          <Divider/>
        </Box>

        <Box textAlign="center" marginBottom={1}>
          <Rating value={avrRating} readOnly/>

          <Typography variant={"h6"}>
            {product?.name}
          </Typography>
        </Box>

        <Typography variant={"subtitle2"}>
          {product?.description}
        </Typography>
      </Box>
    </PaperBox>
  )
}
