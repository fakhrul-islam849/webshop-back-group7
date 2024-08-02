import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

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
      path: "/brand-add",
      element: (
        <MainLayout>
          <BrandAdd />
        </MainLayout>
      ),
    },
    {
      path: "/brand-edit/:id",
      element: (
        <MainLayout>
          <BrandEdit />
        </MainLayout>
      ),
    },
    {
      path: "/pharmaceutical",
      element: (
        <MainLayout>
          <Pharmaceutical />
        </MainLayout>
      ),
    },
    {
      path: "/pharmaceutical/add",
      element: (
        <MainLayout>
          <PharmaceuticalAdd />
        </MainLayout>
      ),
    },
    {
      path: "/pharmaceutical/details/:id",
      element: (
        <MainLayout>
          <PharmaceuticalDetails />
        </MainLayout>
      ),
    },
    {
      path: "/pharmaceutical/edit/:id",
      element: (
        <MainLayout>
          <PharmaceuticalEdit />
        </MainLayout>
      ),
    },
    {
      path: "/order",
      element: (
        <MainLayout>
          <DiagnosticTest />
        </MainLayout>
      ),
    },
    {
      path: "/order-details/:id",
      element: (
        <MainLayout>
          <DiagnosticTestEdit />
        </MainLayout>
      ),
    },
    {
      path: "/low-stock",
      element: (
        <MainLayout>
          <NewsLetter />
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
const BrandAdd = Loadable(lazy(() => import("../pages/Brand/BrandAdd")));
const BrandEdit = Loadable(lazy(() => import("../pages/Brand/BrandEdit")));
const Pharmaceutical = Loadable(
  lazy(() => import("../pages/Pharmaceutical/Pharmaceutical"))
);
const PharmaceuticalAdd = Loadable(
  lazy(() => import("../pages/Pharmaceutical/PharmaceuticalAdd"))
);
const PharmaceuticalDetails = Loadable(
  lazy(() => import("../pages/Pharmaceutical/PharmaceuticalDetails"))
);
const PharmaceuticalEdit = Loadable(
  lazy(() => import("../pages/Pharmaceutical/PharmaceuticalEdit"))
);
const DiagnosticTest = Loadable(
  lazy(() => import("../pages/Diagnostic/DiagnosticTest/DiagnosticTest"))
);
const DiagnosticTestEdit = Loadable(
  lazy(() => import("../pages/Diagnostic/DiagnosticTest/DiagnosticTestEdit"))
);

const NewsLetter = Loadable(
  lazy(() => import("../pages/NewsLetter/NewsLetter"))
);
