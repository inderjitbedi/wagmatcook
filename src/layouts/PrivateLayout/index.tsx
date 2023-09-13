import React, { useEffect } from "react";
import FooterLayout from "../footer";
import { useLocation } from "react-router";
// import Header from "../header/header";

const PrivateLayout = ({ component: Component }: any) => {


  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [pathname]);

  return (
    <>
      <main role="main" style={{ width: '100%' }}>
        {/* <Header /> */}
        <div className="mainBodyWrapper" id="mainBodyWrapper">
          <Component></Component>
        </div>
        {/* <FooterLayout></FooterLayout> */}
      </main>
    </>
  )
};

export default PrivateLayout;
