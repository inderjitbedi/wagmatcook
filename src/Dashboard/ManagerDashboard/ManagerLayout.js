import React from 'react'
import { Dashboard, DashNav, DashMain } from "../OADashboard/OADashBoardStyles";
import ManagerSideBar from './ManagerSideBar';
import { Outlet } from "react-router-dom";
const ManagerLayout = () => {
  return (
    <Dashboard>
      <DashNav>
        <ManagerSideBar />
      </DashNav>
      <DashMain>
        <Outlet />
      </DashMain>
    </Dashboard>
  );
}

export default ManagerLayout