import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NOTIFICATION_SELECTORS } from "./notification.redux";
import { Collapse } from "./collapse";

export const AppNotification = () => {
  const notification = useSelector(NOTIFICATION_SELECTORS.notification);
  return (
    <Collapse isOpen={!!notification}>
      {notification && (
        <NotificationContainer className={`notification-${notification.type}`}>
          {notification.message}
        </NotificationContainer>
      )}
    </Collapse>
  );
};

const NotificationContainer = styled.div`
  display: block;
  z-index: 1400;
  padding: 4px 12px;
  color: white;
  text-align: center;
  background-color: mediumseagreen;
  width: 100%;

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
