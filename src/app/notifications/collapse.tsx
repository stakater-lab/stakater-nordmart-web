import React, { PropsWithChildren } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

const variants: Variants = {
  initial: { opacity: 0, height: 0, overflow: "hidden", width: "100%" },
  enter: { opacity: 1, height: "auto", width: "100%" },
  exit: { opacity: 0, height: 0 },
};

interface ICollapseProps {
  isOpen: boolean;
  initial?: boolean;
}

export const Collapse = ({ isOpen, initial = false, children, ...rest }: PropsWithChildren<ICollapseProps>) => {
  return (
    <AnimatePresence initial={initial}>
      {isOpen && (
        <motion.div variants={variants} initial={"initial"} animate={"enter"} exit={"exit"} {...rest}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
