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
  return useRoutes([
    {
      path: "/brand",
      element: (
        <MainLayout>
          <Brand />
        </MainLayout>
      ),
    },
    {
      path: "/login",
      element: (
        <AuthLayout>
          <Login />
        </AuthLayout>
      ),
    },
    {
      path: "/",
      element: <Navigate to="/brand" />,
      children: [{ element: <Navigate to="/dashboard" />, index: true }],
    },
  ]);
};

export default Router;

const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const Brand = Loadable(lazy(() => import("../pages/Brand/Brand")));
