import React from "react";
import FooterLayout from "../footer";
// import Header from "../header/header";

const PrivateLayout = ({ component: Component }: any) => (
  <>
    <main role="main">
      {/* <Header /> */}
      <div className="mainBodyWrapper" id="mainBodyWrapper">
        <Component></Component>
      </div>
      {/* <FooterLayout></FooterLayout> */}
    </main>
  </>
);

export default PrivateLayout;
