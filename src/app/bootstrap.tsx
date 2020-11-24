import { store } from "./shared/redux/store";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import React from "react";
import { AUTH_EPICS, AUTH_STORE_KEY, authReducer } from "./auth/auth.redux";
import { ReduxLoader } from "./shared/routing/redux-loader";
import { NOTIFICATION_EPICS, NOTIFICATION_REDUX_KEY, notificationReducer } from "./notifications/notification.redux";
import { GlobalStyle } from "./stakater-theme";
import App from "./app";

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle>
      <ReduxLoader
        redux={[
          {
            key: AUTH_STORE_KEY,
            reducer: authReducer,
            epics: AUTH_EPICS,
          },
          {
            key: NOTIFICATION_REDUX_KEY,
            reducer: notificationReducer,
            epics: NOTIFICATION_EPICS,
          },
        ]}
      >
        <App />
      </ReduxLoader>
    </GlobalStyle>
  </Provider>,
  document.getElementById("app"),
);
