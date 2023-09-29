import React from 'react'
import { Dashboard, DashNav, DashMain } from "../OADashboard/OADashBoardStyles";
import { Outlet } from "react-router-dom";
import HRSideBar from './HRSideBar';
const HRLayout = () => {
  return (
    <Dashboard>
      <DashNav>
        <HRSideBar />
      </DashNav>
      <DashMain>
        <Outlet />
      </DashMain>
    </Dashboard>
  );
}

export default HRLayout;