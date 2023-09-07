import React from 'react'
import { Dashboard, DashNav, DashMain } from './OADashBoardStyles';
import SideBar from './SideBar';
import { Outlet } from "react-router-dom";
const OADashBoardLayout = () => {
  return (
    <Dashboard>
      <DashNav>
        <SideBar />
      </DashNav>
      <DashMain>
        <Outlet />
      </DashMain>
    </Dashboard>
  );
}

export default OADashBoardLayout