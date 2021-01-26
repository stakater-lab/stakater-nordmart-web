import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NOTIFICATION_SELECTORS } from "./notification.redux";
import { Box, Container } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";

export const AppNotification = () => {
  const notification = useSelector(NOTIFICATION_SELECTORS.notification);
  return (
    <AnimatePresence>
      {notification && (
        <NotificationContainer
          className={`notification-${notification.type}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Container style={{ display: "flex" }} fixed maxWidth={"md"}>
            <Box display="flex" marginLeft="auto" marginRight="auto">
              {notification.message}
            </Box>
          </Container>
        </NotificationContainer>
      )}
    </AnimatePresence>
  );
};

const NotificationContainer = styled(motion.div)`
  display: block;
  position: relative;
  z-index: 1400;
  padding: 4px 12px;
  color: white;
  background-color: mediumseagreen;
  width: 100vw;

  &.dismiss-icon {
    position: absolute;
    top: 6px;
    right: 12px;
  }

  &.notification-info {
    background-color: dodgerblue;
  }

  &.notification-success {
    background-color: mediumseagreen;
  }

  &.notification-warning {
    background-color: orange;
  }

  &.notification-error {
    background-color: orangered;
  }
`;
