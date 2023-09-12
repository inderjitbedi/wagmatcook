import React, { useState, useEffect } from "react";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import routes from "./routes";
// import NotFound from "../features/auth/pages/notFound";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import ScrollToTop from "../auth/pages/scrollTop";
// import { (!!(localStorage.getItem("user") && localStorage.getItem("token")))LoggedIn } from "../features/auth/authSlice";
// import { fetchAccountStorageSpinnerState } from "../reducers/accountStorageSlice";
// import { useAppSelector } from "../app/hooks";
// import IntegolfLoader from '../shared/integolf-loader/integolf-loader';

const Navigation = () => {
  // const (!!(localStorage.getItem("user") && localStorage.getItem("token"))): any = !!(localStorage.getItem("user") && localStorage.getItem("token"));
  // const location = useLocation();
  // const [(!!(localStorage.getItem("user") && localStorage.getItem("token"))), setIsUser] = useState();

  // useEffect(() => {
  //   // Check if user exists in localStorage on each route change
  //   setIsUser(!!(localStorage.getItem("user") && localStorage.getItem("token")));
  // console.log(!!(localStorage.getItem("user") && localStorage.getItem("token")));

  // }, [location]);
  //useAppSelector((!!(localStorage.getItem("user") && localStorage.getItem("token")))LoggedIn);
  // const showSpinner = useAppSelector(fetchAccountStorageSpinnerState);


  const renderNestedRoutes = (routes:any) => {
    return (
      <>
        {routes.map(({ component, path, type, to, title, children }:any) => (
          <React.Fragment key={path}>
            {type === 'public' && (
              <Route
                path={path}
                element={<PublicLayout component={component} />}
              />
            )}
            {type === 'private' && (
              <Route
                path={path}
                element={<PrivateLayout component={component} />}
              >
                {children && children.length && renderNestedRoutes(children)}
              </Route>
            )}
            {((type === 'public') || (type === 'private')) && (
              <Route path={path} element={<Navigate replace to={to} />} />
            )}
          </React.Fragment>
        ))}
      </>
    );
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>  
        <Route path="/landing.html" />

        {renderNestedRoutes(routes)}
        {/* {routes.map(({ component: Component, path, type, to, title, children }) => (
          <React.Fragment key={Date.now()}> */}

            {/* && !(!!(localStorage.getItem("user") && localStorage.getItem("token")))  */}
            {/* {type === "public" && (
              <Route
                path={path}
                key={Date.now()}
                element={
                  <PublicLayout component={Component}></PublicLayout>}
              ></Route>
            )} */}
            {/* && (!!(localStorage.getItem("user") && localStorage.getItem("token"))) */}
            {/* {type === "private" && (
              <Route
                path={path}
                key={Date.now()}
                element={
                 <PrivateLayout component={Component}></PrivateLayout>}
              >
                {children && children.length && children.map((e) => (
                  <Route path={e.path} index={e.index ? true : undefined} key={Date.now()} element={<e.component />} />
                ))}
              </Route>
            )} */}

            {/* && (!!(localStorage.getItem("user") && localStorage.getItem("token"))) */}
            {/* {((type === "public") || (type === "private")) && <Route path={path} element={<Navigate replace to={to} />}> */}
              {/* && !(!!(localStorage.getItem("user") && localStorage.getItem("token"))) */}
            {/* </Route>} */}


          {/* </React.Fragment> */}
        {/* ))} */}
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
