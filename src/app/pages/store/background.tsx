import {Box, BoxProps, styled} from "@material-ui/core";
import React from "react";

interface IBackgroundProps extends BoxProps {
  src: string;
}

export const Background = styled(({src, ...rest}: IBackgroundProps) => <Box {...rest}/>)((props: any) => ({
  backgroundImage: `url(${props.src})`,
  backgroundPosition: "center center",
  backgroundSize: "auto",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "scroll"
}));
