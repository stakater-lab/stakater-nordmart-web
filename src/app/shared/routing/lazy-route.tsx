import React, { cloneElement, ComponentType, isValidElement, lazy, Suspense, useMemo } from "react";
import { Redirect, Route, RouteProps, Switch } from "react-router";
import { IRedux } from "./IRedux";
import { ReduxLoader } from "./redux-loader";

interface IRouteModuleProps extends Omit<RouteProps, "component"> {
  component: () => Promise<{ default: ComponentType }>;
  redux?: IRedux[];
  subModules?: IRouteModuleProps[];
  redirect?: string;
}

export const LazyRoute = (props: IRouteModuleProps) => {
  const { subModules = [], redirect, component, children, redux = [], path, ...rest } = props;
  const Lazy = lazy(component);

  const NestedRoutes = useMemo(
    () =>
      subModules.length > 0 ? (
        <Switch>
          {subModules.map(({ path: smPath, ...rest }) => (
            <LazyRoute {...rest} path={`${path}${smPath}`} key={`${path}/${smPath}`} />
          ))}
          {redirect && <Redirect to={`${path}${redirect}`} />}
        </Switch>
      ) : null,
    [subModules],
  );

  const Nested = useMemo(
    () =>
      children && isValidElement(children)
        ? cloneElement(children, {
            children: NestedRoutes,
          })
        : NestedRoutes,
    [children, NestedRoutes],
  );

  return (
    <Route {...rest} path={path}>
      <ReduxLoader redux={redux}>
        <Suspense fallback={<></>}>
          <Lazy>{Nested}</Lazy>
        </Suspense>
      </ReduxLoader>
    </Route>
  );
};
