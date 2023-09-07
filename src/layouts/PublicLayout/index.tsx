import React, { useEffect } from "react";
import { Grid } from "@mui/material";

const PublicLayout = ({ component: Component }: any) => {
  const componentImageMap: any = {
    CompleteSignup: './../../../assets/login-image.svg',
  };
  const imageUrl = componentImageMap[Component.name] || './../assets/login-image.svg';
  console.log(Component.name, imageUrl);

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
                <img
                  src={imageUrl}
                  alt="background-img"
                  width="100%"
                />
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
  )
};

export default PublicLayout;
