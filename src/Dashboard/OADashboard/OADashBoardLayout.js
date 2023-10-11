import React, { useState, useEffect } from "react";
import { Dashboard, DashNav, DashMain } from "./OADashBoardStyles";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
const OADashBoardLayout = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log("our screen size", screenWidth);

  return (
    <Dashboard>
      {screenWidth < 1200 ? (
        " "
      ) : (
        <DashNav>
          <SideBar />
        </DashNav>
      )}
      <DashMain
        style={screenWidth < 1200 ? { width: "100%" } : { width: "80%" }}
      >
        <Outlet />
      </DashMain>
    </Dashboard>
  );
};

export default OADashBoardLayout;
