import React from 'react';
import {Box, BoxProps, Paper} from "@material-ui/core";

export const PaperBox = (props: BoxProps) => {
  return (
    <Paper>
      <Box {...props} />
    </Paper>
  );
}
