import {motion} from 'framer-motion';
import React, {PropsWithChildren} from 'react';

export const SlideDown = ({children}: PropsWithChildren<any>) => (
  <motion.div
    initial={{opacity: 0, scaleY: 0, originY: 0}}
    animate={{opacity: 1, scaleY: 1, originY: 0}}
    exit={{opacity: 0, scaleY: 0, originY: 0}}
    transition={{duration: 0.1}}
  >
    {children}
  </motion.div>
);
