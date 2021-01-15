import React, {useMemo, useState} from 'react';
import {Product} from "../store/Product";
import {getProductRatingsAPI} from "../store/store.service";
import {useAPI} from "../store/useAPI";
import {Rating} from "@material-ui/lab";
import {of} from "rxjs";
import {Box, Divider, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import { Fragment } from 'react';
import moment from "moment";

interface IReviewComponentProps {
  product?: Product;
}

export const RatingComponent = ({product}: IReviewComponentProps) => {
  const $ratings = useMemo(() => product?.itemId ? getProductRatingsAPI(product.itemId) : of([]), [product]);
  const [ratings] = useAPI($ratings, []);
  const avrRating = useMemo(() => ratings.reduce((previousValue, currentValue) => previousValue + currentValue.rating, 0) / ratings.length, [ratings]);
  const [show, setShow] = useState(false);

  return (
    <List>
      <ListItem button onClick={() => setShow(!show)} selected={show}>
        <ListItemText primary={<Rating value={avrRating} readOnly/>}/>
        <Typography color={"secondary"}>
          ({ratings.length}) reviews
        </Typography>
      </ListItem>

      {show && (
        <List>
          {ratings.map((r, i) => (
            <Fragment key={r.reviewText}>
              {!!i && (<Divider/>)}
              <ListItem>
                <ListItemText primary={
                  <Box display="flex" justifyContent={"space-between"}>
                    <Typography>
                      <b>{r.customerName?.replace("+", " ")}</b>
                    </Typography>

                    <Typography color={"textSecondary"}>
                      {moment(r.dateTime).fromNow()}
                    </Typography>
                  </Box>
                } secondary={r.reviewText?.replace("+", " ")}/>
              </ListItem>
            </Fragment>
          ))}
        </List>
      )}
    </List>
  );
};
