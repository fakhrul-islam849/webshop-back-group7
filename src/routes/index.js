import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation, Route } from "react-router-dom";

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback="Loading...">
      <Component {...props} />
    </Suspense>
  );
};

const Router = () => {
  return useRoutes();
};

export default Router;
