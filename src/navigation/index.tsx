import React, { useState } from "react";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import routes from "./routes";
// import NotFound from "../features/auth/pages/notFound";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import ScrollToTop from "../features/auth/pages/scrollTop";
// import { isUserLoggedIn } from "../features/auth/authSlice";
// import { fetchAccountStorageSpinnerState } from "../reducers/accountStorageSlice";
// import { useAppSelector } from "../app/hooks";
// import IntegolfLoader from '../shared/integolf-loader/integolf-loader';

const Navigation = () => {
  const isUser: boolean = !!localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "") && localStorage.getItem("token")
    : ""; //useAppSelector(isUserLoggedIn);
  // const showSpinner = useAppSelector(fetchAccountStorageSpinnerState);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/landing.html" />

        {routes.map(
          ({ component: Component, path, type, to, title, children }) => (
            <React.Fragment key={Date.now()}>
              <Route
                path={path}
                key={path}
                element={
                  <ScrollToTop>
                    {(type === "public" && !isUser) ? (
                      <PublicLayout component={Component} />
                    ) : type === "private" && isUser ? (
                      <PrivateLayout component={Component}>
                        {children &&
                          children.length &&
                          children.map((e: any) => (
                            <Route
                              path={e.path}
                              key={e.path}
                              element={<e.component />}
                            />
                          ))}
                      </PrivateLayout>
                    ) : (
                      <Navigate replace to={to} />
                    )}
                  </ScrollToTop>
                }
              />
            </React.Fragment>
          )
        )}
        {/* <Route path="*" element={<NotFound />} /> */}
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      {/* <IntegolfLoader show={showSpinner}/> */}
    </>
  );
};

export default Navigation;
