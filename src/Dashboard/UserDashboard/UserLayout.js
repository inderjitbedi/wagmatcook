import React from "react";
import { Dashboard, DashNav, DashMain } from "../OADashboard/OADashBoardStyles";
import { Outlet } from "react-router-dom";
import UserSideBar from "./UserSideBar";

const UserLayout = () => {
  return (
    <Dashboard>
      <DashNav>
        <UserSideBar />
      </DashNav>
      <DashMain>
        <Outlet />
      </DashMain>
    </Dashboard>
  );
};

export default UserLayout;
