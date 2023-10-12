import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import ScrollToTop from "../../auth/pages/scrollTop";

const PublicLayout = ({ component: Component }: any) => {
  const componentImageMap: any = {
    CompleteSignup: "./../../../assets/solar-bg.png",
  };
  const location = useLocation();

  // console.log(location.pathname.indexOf('/organization-admin/complete-signup'));
  //
  const imageUrl =
    location.pathname.indexOf("/organization-admin/complete-signup") > -1
      ? "./../../../assets/solar-bg.png"
      : "./../assets/solar-bg.png";
  // console.log(Component.name, imageUrl);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [pathname]);
  return (
    <>
      <main role="main">
        <Grid container spacing={2}>
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
              <div className="">
                <img src={imageUrl} alt="background-img" width="100%" />
              </div>
            </div>
          </Grid>
          <Grid item xs={9}>
            <Component />
          </Grid>
        </Grid>
        {/* <FooterLayout></FooterLayout> */}
      </main>
    </>
  );
};

export default PublicLayout;
