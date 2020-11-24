import { store } from "./shared/redux/store";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import React, { lazy, Suspense } from "react";
import { doubleStorage } from "./shared/decorators/utils";
import { AUTH_EPICS, AUTH_STORE_KEY, authReducer, STORED_REALM } from "./auth/auth.redux";
import { authService } from "./auth/keycloak.service";
import { ReduxLoader } from "./shared/routing/redux-loader";
import { NOTIFICATION_EPICS, NOTIFICATION_REDUX_KEY, notificationReducer } from "./notifications/notification.redux";
import { LinearProgress } from "@material-ui/core";
import { GlobalStyle } from "./stakater-theme";

const InitKeycloak = lazy(async () => {
  const isRealmValid = await authService.checkRealm();
  if (isRealmValid) {
    await authService.init();
    return import("./app");
  } else {
    doubleStorage.set(STORED_REALM, "");
    return import("./auth/welcome");
  }
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
