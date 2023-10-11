import React, { useState, useEffect } from "react";
import { Dashboard, DashNav, DashMain } from "../OADashboard/OADashBoardStyles";
import { Outlet } from "react-router-dom";
import UserSideBar from "./UserSideBar";

const UserLayout = () => {
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
  return (
    <Dashboard>
      {screenWidth < 1200 ? (
        " "
      ) : (
        <DashNav>
          <UserSideBar />
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

export default UserLayout;
