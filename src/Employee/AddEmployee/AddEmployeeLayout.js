import React from "react";
import { Outlet } from "react-router-dom";
import EmployeeSidebar from "./EmployeeSidebar";
import { Employee, EmployeeMain, EmployeeNav } from "./AddEmployeeStyles";
const AddEmployeeLayout = () => {
  return (
    <Employee>
      <EmployeeNav>
        <EmployeeSidebar />
      </EmployeeNav>
          <EmployeeMain>
              <Outlet />
      </EmployeeMain>
    </Employee>
  );
};

export default AddEmployeeLayout;
