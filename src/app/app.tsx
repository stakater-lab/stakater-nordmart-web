import React, {useEffect} from "react";
import {Route, Switch} from "react-router";
import {HashRouter} from "react-router-dom";
import {NotFound} from "./404";
import {useSelector} from "react-redux";
import {AUTH_SELECTOR, LoginFailedAction, LoginSuccessAction} from "./auth/auth.redux";
import {authService} from "./auth/keycloak.service";
import {store} from "./shared/redux/store";
import {AppNotification} from "./notifications/notification";
import {TopMenu} from "./navigation/top-menu";

export const App = () => {
  const isAuthorized = useSelector(AUTH_SELECTOR.isAuthorized);
  useEffect(() => {
    if (!isAuthorized && authService.keyCloak?.authenticated) {
      authService.keyCloak
        .loadUserInfo()
        .then(() => {
          store.dispatch(new LoginSuccessAction(authService.session));
        })
        .catch((err) => {
          store.dispatch(new LoginFailedAction(err));
        });
    }
  }, [isAuthorized]);

  return (
    <HashRouter>
      <AppNotification/>
      <TopMenu/>

      <Switch>

        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default App;
