import React, {useState} from 'react';
import {IMenu} from "./IMenu";
import {Box, ClickAwayListener, List, ListItem, Typography} from "@material-ui/core";
import {useHistory, useRouteMatch} from "react-router";
import isEmpty from "lodash/isEmpty";
import {Dropdown} from "./dropdown";

interface IMenuItemProps {
  menu: IMenu;
}

export const NavMenu = ({menu: {name, path, icon, subMenu = []}}: IMenuItemProps) => {
  const history = useHistory();
  const isActive = useRouteMatch(path || "Invalid");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClick = () => {
    if (subMenu && subMenu.length > 0) {
      setOpen(!open);
    }

    if(!isActive && path) {
      history.push(path);
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <List disablePadding ref={setAnchorEl}>
        <ListItem button={!isEmpty(path) as any || subMenu.length > 0} selected={!!isActive || open}
                  onClick={handleClick}>
          {icon && (
            <Box marginRight={0.5}>
              {icon}
            </Box>
          )}

          <Typography color={"inherit"}>
            {name}
          </Typography>
        </ListItem>

        <Dropdown onClose={() => setOpen(false)} open={open} anchorEl={anchorEl}>
          <List>
            {subMenu?.map((sm, i) => (
              <ListItem button={!isEmpty(sm.path) as any} key={i}>
                {sm.icon && (
                  <Box marginRight={0.5}>
                    {sm.icon}
                  </Box>
                )}

                <Typography color={"inherit"}>
                  {sm.name}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Dropdown>
      </List>
    </ClickAwayListener>
  );
};
