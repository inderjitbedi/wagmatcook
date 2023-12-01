import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import ROLES from "../../constants/roles";
import httpClient from "../../api/httpClient";
import API_URLS from "../../constants/apiUrls";
import { Tree, TreeNode } from "react-organizational-chart";
import {
  MainBodyContainer,
  ChartBox,
  FlexColumn100,
  ChartImg,
  ChartName,
  ChartLight,
  FlexContaier,
} from "./ViewEmployeeStyle";
import { MdDiversity2 } from "react-icons/md";
const EvChart = () => {
  let API_URL = process.env.REACT_APP_API_URL;

  const { employeeid } = useParams();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [isAccount, setIsAccount] = useState(false);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const GetEmployeesChartData = () => {
    setIsLoading(true);
    let url = API_URLS.getChartData.replace(":id", employeeid);
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result.orgChart.reverse());
          console.log(buildTree(result.orgChart));
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log("this is the result:", result);
  useEffect(() => {
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    }
    if (location.pathname.indexOf("account") > -1) {
      setIsAccount(true);
    }
    GetEmployeesChartData();
  }, []);
  function buildTree(orgChart) {
    const employeeMap = {};

    // Create a map of employees using their IDs for quick access
    orgChart.forEach((employee) => {
      employeeMap[employee.employeeId] = {
        ...employee,
        children: [],
      };
    });

    // Build the tree structure
    orgChart.forEach((employee) => {
      if (employee.subordinates) {
        employee.subordinates.forEach((subordinateId) => {
          const subordinate = employeeMap[subordinateId];
          if (subordinate) {
            employeeMap[employee.employeeId].children.push(subordinate);
          }
        });
      }
    });

    // Find the root node(s) by checking which employee doesn't have a manager
    const roots = orgChart.filter(
      (employee) =>
        !employeeMap[employee.employeeId].hasOwnProperty("firstName")
    );

    return roots.map((root) => employeeMap[root.employeeId]);
  }
  const EmployeeNode = ({ employee }) => (
    <ChartBox>
      <FlexContaier>
        <ChartImg
          src={
            employee.photo 
              ? API_URL + employee.photo.path
              : "/images/User.jpg"
          }
        />
        <div>
          <ChartName>
            {" "}
            {employee.firstName} {employee.lastName}{" "}
          </ChartName>
          <ChartLight>{employee.position}</ChartLight>
        </div>
      </FlexContaier>
    </ChartBox>
  );
  const renderTreeNodes = (employees) => {
    return employees.map((employee) => (
      <TreeNode
        key={employee.employeeId}
        label={<EmployeeNode employee={employee} />}
      >
        {employee.subordinates &&
          employee.subordinates.length > 0 &&
          renderTreeNodes(employee.subordinates)}
      </TreeNode>
    ));
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "70vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RotatingLines
            strokeColor="#279AF1"
            strokeWidth="3"
            animationDuration="0.75"
            width="52"
            visible={true}
          />
        </div>
      ) : (
        <MainBodyContainer>
          <Tree
            lineColor={"#279af1"}
            label={
              <ChartBox>
                {" "}
                <ChartName>Your Community Portal</ChartName>
              </ChartBox>
            }
          >
            {renderTreeNodes(result)}
          </Tree>
        </MainBodyContainer>
      )}
    </div>
  );
};

export default EvChart;
