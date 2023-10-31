import React, { useEffect, useState } from "react";
import FooterLayout from "../footer";
import { useLocation, useNavigate, Navigate } from "react-router";
import ROLES from "../../constants/roles";
import { RotatingLines } from "react-loader-spinner";

// import Header from "../header/header";
interface User {
  role: string;
  // Add other user properties as needed
}
const roleBasedGuard = (allowedRoles: any, userRole: any) => {
  if (allowedRoles.includes(userRole)) {
    console.log(
      "in true condition:",
      allowedRoles,
      userRole,
      allowedRoles.includes(userRole)
    );
    return true;
  } else {
    console.log("in flase condition:", allowedRoles, userRole);

    return false;
  }
};
const PrivateLayout = ({ component: Component, meta }: any) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [pathname]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      setUser(parsedUser);
    } else {
      navigate("/");
      localStorage.setItem("returnUrl", pathname);
      console.log("the pathname is stored in local storage :", pathname);
    }
  }, [navigate]);
  const userRole = user?.role;
  if (!user) {
    return null;
  }
  return (
    <>
      {roleBasedGuard(meta.allowedRoles, userRole) ? (
        <main role="main" style={{ width: "100%" }}>
          {/* <Header /> */}
          <div className="mainBodyWrapper" id="mainBodyWrapper">
            <Component></Component>
          </div>
          {/* <FooterLayout></FooterLayout> */}
        </main>
      ) : userRole === ROLES.ORG_ADMIN ? (
        <Navigate to="/organization-admin/dashboard" />
      ) : userRole === ROLES.MANAGER ? (
        <Navigate to="/manager-management/dashboard" />
      ) : userRole === ROLES.HR ? (
        <Navigate to="/hr-management/dashboard" />
      ) : userRole === ROLES.EMPLOYEE ? (
        <Navigate to="/user-management/dashboard" />
      ) : userRole === ROLES.SUPER_ADMIN ? (
        <Navigate to="/super-admin/organizations" />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default PrivateLayout;
