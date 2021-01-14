import { store } from "./shared/redux/store";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import React, { lazy, Suspense } from "react";
import { AUTH_EPICS, AUTH_STORE_KEY, authReducer } from "./auth/auth.redux";
import { ReduxLoader } from "./shared/routing/redux-loader";
import { NOTIFICATION_EPICS, NOTIFICATION_REDUX_KEY, notificationReducer } from "./notifications/notification.redux";
import { GlobalStyle } from "./stakater-theme";
import { STORE_EPICS, STORE_REDUX_KEY, storeReducer } from "./pages/store/store.redux";
import { LinearProgress } from "@material-ui/core";
import { authService } from "./auth/keycloak.service";

const InitKeycloak = lazy(async () => {
  const isRealmValid: boolean = await authService.init();
  if (isRealmValid) {
  } else {
  }

  return import("./app");
});

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
          {
            key: STORE_REDUX_KEY,
            reducer: storeReducer,
            epics: STORE_EPICS,
          },
        ]}
      >
        <Suspense fallback={<LinearProgress color={"secondary"} />}>
          <InitKeycloak />
        </Suspense>
      </ReduxLoader>
    </GlobalStyle>
  </Provider>,
  document.getElementById("app"),
);
