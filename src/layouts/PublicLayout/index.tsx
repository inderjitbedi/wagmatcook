import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollToTop from "../../auth/pages/scrollTop";
import { RotatingLines } from "react-loader-spinner";
import ROLES from "../../constants/roles";
import {
  AuthLayout,
  PrimaryDiv,
  SecondaryDIv,
} from "../../Employee/ViewEmployee/ViewEmployeeStyle";
interface User {
  role: string;
  // Add other user properties as needed
}
const PublicLayout = ({ component: Component }: any) => {
  const componentImageMap: any = {
    CompleteSignup: "./../../../assets/solar-bg.png",
  };
  const location = useLocation();

  // //console.log(location.pathname.indexOf('/organization-admin/complete-signup'));
  //
  const imageUrl =
    location.pathname.indexOf("/organization-admin/complete-signup") > -1
      ? "./../../../assets/solar-bg.png"
      : "/images/image 4.svg";
  // //console.log(Component.name, imageUrl);
  const { pathname } = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [pathname]);
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      setUser(parsedUser);
      if (ROLES.SUPER_ADMIN === parsedUser.role) {
        navigate("/super-admin/organizations");
      } else if (ROLES.ORG_ADMIN === parsedUser.role) {
        navigate("/organization-admin/dashboard");
      } else if (ROLES.HR === parsedUser.role) {
        navigate("/hr-management/dashboard");
      } else if (ROLES.MANAGER === parsedUser.role) {
        navigate("/manager-management/dashboard");
      } else if (ROLES.EMPLOYEE === parsedUser.role) {
        navigate("/user-management/dashboard");
      }
    }
  }, []);
  if (user) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "70vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RotatingLines
          strokeColor="#279AF1"
          strokeWidth="3"
          animationDuration="0.75"
          width="52"
          visible={true}
        />
      </div>
    );
  }
  return (
    <>
      <main role="main">
        <AuthLayout>
          <PrimaryDiv>
            <div className="sidebar">
              <div className="content-box">
                <div className="logo">Wagmatcook</div>
                <h4 className="mt-6">
                  Communicate to Employees via Feeds, SMS, Email
                </h4>
                <p>
                  Welcome to our website! We hope it provides you with a good
                  perspective about our community. Better yet, come visit us and
                  the experiences we are willing to share with you.
                </p>
              </div>
              <div
                className="ImageContainer"
                style={{ backgroundColor: "#093FE1" }}
              >
                <img
                  src="/images/image 4.svg"
                  alt="background-img"
                  width="100%"
                />
              </div>
            </div>
          </PrimaryDiv>
          <SecondaryDIv>
            <Component />
          </SecondaryDIv>
        </AuthLayout>

        {/* <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="sidebar">
              <div className="content-box">
                <div className="logo">Wagmatcook</div>
                <h4 className="mt-6">
                  Communicate to Employees via Feeds, SMS, Email
                </h4>
                <p>
                  Welcome to our website! We hope it provides you with a good
                  perspective about our community. Better yet, come visit us and
                  the experiences we are willing to share with you.
                </p>
              </div>
              <div className="" style={{ backgroundColor: "#093FE1" }}>
                <img
                  src="/images/image 4.svg"
                  alt="background-img"
                  width="100%"
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={9}>
            <Component />
          </Grid>
        </Grid> */}
        {/* <FooterLayout></FooterLayout> */}
      </main>
    </>
  );
};

export default PublicLayout;
