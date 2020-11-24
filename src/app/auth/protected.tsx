import { Redirect, Route, RouteProps } from "react-router";
import { useSelector } from "react-redux";
import React, { useMemo } from "react";
import { AUTH_SELECTOR } from "./auth.redux";

interface IProtectedRoute extends RouteProps {
  allowAnonymous?: boolean;
}

export const ProtectedRoute = ({ allowAnonymous, children, ...rest }: IProtectedRoute) => {
  const isAuthenticated = useSelector(AUTH_SELECTOR.isAuthorized);

  const from = useMemo(() => {
    try {
      return rest.location!.pathname + rest.location!.search;
    } catch (e) {
      return "/";
    }
  }, [rest.location]);

  return (
    <Route {...rest}>
      {allowAnonymous || isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from },
          }}
        />
      )}
    </Route>
  );
};
