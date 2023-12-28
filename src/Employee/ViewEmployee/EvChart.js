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
          setResult(result.orgChart);

          // console.log(buildTree(result.orgChart));
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
    } else if (location.pathname.indexOf("organization-admin") > -1) {
      setUserType(ROLES.ORG_ADMIN);
    }
    if (location.pathname.indexOf("account") > -1) {
      setIsAccount(true);
    }
    GetEmployeesChartData();
  }, []);

  const EmployeeNode = ({ employee }) => (
    <ChartBox>
      <FlexContaier style={{ width: "200px" }}>
        <ChartImg
          src={
            employee.personalInfo?.photo
              ? API_URL + employee.personalInfo?.photo.path
              : "/images/User.jpg"
          }
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <ChartName>
            {" "}
            {employee.personalInfo.firstName} {employee.personalInfo.lastName}{" "}
          </ChartName>
          <ChartLight>
            {employee.role === "HUMAN_RESOURCE"
              ? "HR"
              : employee.role === "EMPLOYEE"
              ? "User"
              : employee.role === "ORGANIZATION_ADMIN"
              ? "Organization Admin"
              : employee.role === "MANAGER"
              ? "Manager"
              : " - "}
          </ChartLight>
          <ChartLight>{employee.position}</ChartLight>
        </div>
      </FlexContaier>
    </ChartBox>
  );
  const renderTreeNodes = (employees) => {
    return employees.map((employee) => (
      <TreeNode key={employee.id} label={<EmployeeNode employee={employee} />}>
        {Array.isArray(employee.reportsTo) &&
          renderTreeNodes(employee.reportsTo)}
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
