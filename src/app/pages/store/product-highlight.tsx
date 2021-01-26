import React, {useMemo} from 'react';
import {Box, Card, CardContent, CardMedia, Modal, Typography} from "@material-ui/core";
import {CallBack} from "../../typings";
import {useSelector} from "react-redux";
import {STORE_SELECTORS} from "./store.redux";
import {useParams} from "react-router";
import {IMAGE_MAP} from "./product-images";
import {RatingComponent} from "../review/rating-component";
import {AddProduct} from "../cart/add-product";
import {usePromotion} from "./usePromotion";


interface IProductHighlightProps {
  onClose?: CallBack;
}

export const ProductHighlight = ({onClose}: IProductHighlightProps) => {
  const params = useParams<{ productId: string }>();
  const products = useSelector(STORE_SELECTORS.products);
  const selectedProduct = useMemo(() => products.find(p => p.itemId === params.productId), [products, params]);
  const promotion = usePromotion(selectedProduct);

  return (
    <Modal open={true} onClose={onClose}>
      <Box display="flex" justifyContent={"space-around"} alignItems="center" width="100vw" height="100vh"
           style={{outline: "none", pointerEvents: "none"}}>
        <Card style={{pointerEvents: "all", maxWidth: 500}}>
          <CardMedia
            component="img"
            image={IMAGE_MAP[selectedProduct?.name || ""]}
            title={selectedProduct?.name}
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {selectedProduct?.name}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              {selectedProduct?.description}
            </Typography>

            <Box marginY={2}>
              <RatingComponent product={selectedProduct}/>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography gutterBottom variant="h2">
                {selectedProduct?.price} $
              </Typography>

              {promotion?.active && (
                <Typography gutterBottom variant="h6" color={"error"}>
                  -{promotion.percentOff}% off
                </Typography>
              )}
            </Box>

            <AddProduct product={selectedProduct}/>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
