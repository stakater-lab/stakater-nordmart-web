import React, {PropsWithChildren} from "react";
import {Paper, Popper} from "@material-ui/core";
import {PopperProps} from "@material-ui/core/Popper/Popper";
import {AnimatePresence, motion} from "framer-motion";
import {CallBack} from "../typings";

interface IDropdownProps extends PropsWithChildren<PopperProps> {
  onClose: CallBack;
}

export const Dropdown = (props: IDropdownProps) => {
  const {
    children,
    placement = "bottom-start",
    onClose,
    open,
    anchorEl,
    modifiers,
    ...rest
  } = props;

  return <>
    {anchorEl && (
      <Popper placement={placement} modifiers={{
        offset: {
          enabled: true,
          padding: 0
        },
        ...modifiers
      }}  {...rest} anchorEl={anchorEl} open={true} keepMounted>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{opacity: 0, scaleY: 0, originY: 0}}
              animate={{opacity: 1, scaleY: 1, originY: 0}}
              exit={{opacity: 0, scaleY: 0, originY: 0}}
              transition={{duration: 0.1}}
              data-testid="dropdown-menu"
            >
              <Paper style={{minWidth: 200, paddingTop: "1em"}} elevation={1}>
                {children}
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Popper>
    )}
  </>;
};
