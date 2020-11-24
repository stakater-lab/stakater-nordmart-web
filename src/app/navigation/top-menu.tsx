import React from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import StakaterLogo from "../../assets/img/stakater-icon.svg";

export const TopMenu = () => {
  return (
    <AppBar elevation={0} position={"relative"}>
      <Toolbar className="ml4">
        <StakaterLogo height={24} />
        <Typography variant={"h6"}>Stakater</Typography>
        <Typography variant={"caption"}>Cloud</Typography>
      </Toolbar>

      <Toolbar className="ml-auto">
      </Toolbar>
    </AppBar>
  );
};
