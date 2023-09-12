// import login from "../auth/pages/login";
import signup from "../OrgAdmin/CompleteSignup";
import signin from "../auth/shared/signin";
import verifyuser from "../OrgAdmin/verifyuser";
import RegisterOrganization from "../OrgAdmin/orgRegister";
import OADashBoard from "../Dashboard/OADashboard/OADashBoard";
import OADashBoardNext from "../Dashboard/OADashboard/OADashBoardNext";
import ForgotPassword from "../auth/shared/forgot-password";
import ResetPassword from "../auth/shared/reset-password";

// import verify from "../auth/pages/verify"
import Departments from "../Departments/Departments";
import Disciplinary from "../Disciplinary/Disciplinary";
import SAOrganization from "../SuperAdmin/SAOrganization";
import SAUserList from "../SuperAdmin/SAUserList";
import Benefits from "../Employee/AddEmployee/Benefits";
import CertificatesInfo from "../Employee/AddEmployee/CertificatesInfo";
import JobDetails from "../Employee/AddEmployee/JobDetails";
import PersonalInfo from "../Employee/AddEmployee/PersonalInfo";
import EmployeeList from "../Employee/ViewEmployee/EmployeeList";
import EmployeeJobDetails from "../Employee/ViewEmployee/EmployeeJobDetails";
import EmployeePersonal from "../Employee/ViewEmployee/EmployeePersonal";
import EVBenefits from "../Employee/ViewEmployee/EVBenefits";
import EVCertificates from "../Employee/ViewEmployee/EVCertificates";
import EVDiscipline from "../Employee/ViewEmployee/EVDiscipline";
import EVDocuments from "../Employee/ViewEmployee/EVDocuments";
import EVLeaveHistory from "../Employee/ViewEmployee/EVLeaveHistory";
import EVPerformance from "../Employee/ViewEmployee/EVPerformance";
import SharedSignin from "../Shared/Auth/Signin";
import VerifyOTP from "../Shared/Auth/VerifyOTP";
import SALayout from "../SuperAdmin/SALayout";
import CompleteSignup from "../OrgAdmin/CompleteSignup";
import OADashBoardLayout from "../Dashboard/OADashboard/OADashBoardLayout";
import EmployeeDetailLayout from "../Employee/ViewEmployee/EmployeeDetailLayout";
import AddEmployeeLayout from "../Employee/AddEmployee/AddEmployeeLayout";
import EmployeeLayout from "../Employee/EmployeeLayout";
const Routes: any = [
  {
    component: signup,
    path: "/complete-signup",
    title: "Org Admin Register",
    to: "/",
    type: "public",
    children: [],
  },

  {
    component: ForgotPassword,
    path: "/forgot-password",
    title: "forgot-password",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: ResetPassword,
    path: "/reset-password/:token",
    title: "reset-password",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: verifyuser,
    path: "/verifyuser",
    title: "verifyuser",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: RegisterOrganization,
    path: "/register-organization",
    title: "register-organization",
    to: "/",
    type: "private",
    children: [],
  },
  {
    component: OADashBoardLayout,
    path: "/organization-admin",
    title: "OrganizationAdmin",
    to: "/",
    type: "private",
    children: [
      {
        component: OADashBoard,
        path: "dashboard",
        title: "DashBoard",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: OADashBoardNext,
        path: "DashBoardNext",
        title: "DashBoardNext",
        to: "/",
        type: "private",
        index: true,
      },

      {
        component: Departments,
        path: "departments",
        title: "Departments",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: Disciplinary,
        path: "disciplinary",
        title: "Disciplinary ",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: EmployeeLayout,
        path: "employee",
        title: "Employee ",
        to: "/",
        type: "private",
        children: [
          {
            component: EmployeeList,
            path: "list",
            title: "Employee ",
            to: "/",
            type: "private",

          },
          {
            component: EmployeeDetailLayout,
            path: "details",
            title: "Employee ",
            to: "/",
            type: "private",
            children: [

              {
                component: EmployeePersonal,
                path: "personal-info/:employeeid",
                title: "EmployeePersonal ",
                to: "/",
                type: "private",
                index: true,
              },

              {
                component: EmployeeJobDetails,
                path: "job-details/:employeeid",
                title: "EmployeeJobDetails ",
                to: "/",
                type: "private",
              },
              {
                component: EVBenefits,
                path: "benefits/:employeeid",
                title: "Benefits ",
                to: "/",
                type: "private",
              },

              {
                component: EVLeaveHistory,
                path: "leave-history/:employeeid",
                title: "EVLeaveHistory ",
                to: "/",
                type: "private",
              },
              {
                component: EVCertificates,
                path: "certificates/:employeeid",
                title: "EVCertificates ",
                to: "/",
                type: "private",
              },
              {
                component: EVDiscipline,
                path: "discipline/:employeeid",
                title: "EVDiscipline ",
                to: "/",
                type: "private",
              },
              {
                component: EVDocuments,
                path: "documents/:employeeid",
                title: "EVDocuments ",
                to: "/",
                type: "private",

              },
              {
                component: EVPerformance,
                path: "performance/:employeeid",
                title: "EVPerformance ",
                to: "/",
                type: "private",

              },
            ],
          },
          {
            component: Benefits,
            path: "benefits/:employeeid",
            title: "Benefits ",
            to: "/",
            type: "private",

          },
          {
            component: CertificatesInfo,
            path: "certificates-info/:employeeid",
            title: "CertificatesInfo ",
            to: "/",
            type: "private",

          },
          {
            component: JobDetails,
            path: "job-details/:employeeid",
            title: "JobDetails ",
            to: "/",
            type: "private",

          },
          {
            component: PersonalInfo,
            path: "personal-info/:employeeid",
            title: "PersonalInfo ",
            to: "/",
            type: "private",

          },
        ],
      }
    ],
  },


  {
    component: SAUserList,
    path: "/SAUserList",
    title: "SAUserList ",
    to: "/",
    type: "public",
    children: [],
  },

  {
    component: SAOrganization,
    path: "/SAOrganization",
    title: "SAOrganization ",
    to: "/",
    type: "public",
    children: [],
  },

  {
    component: AddEmployeeLayout,
    path: "/add-new-employee",
    title: "AddEmployee",
    to: "/",
    type: "private",
    children: [],
  },

  {
    component: SharedSignin,
    path: "/",
    title: "Signin",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: VerifyOTP,
    path: "/verify-otp",
    title: "Verify OTP",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: CompleteSignup,
    path: "/organization-admin/complete-signup/:email/:token",
    title: "Organization Admin | Signup",
    to: "/",
    type: "public",
    children: [],
  },

  {
    component: SALayout,
    path: "/super-admin",
    title: "SuperAdmin",
    to: "/",
    type: "private",
    children: [
      {
        component: SAOrganization,
        path: "organizations",
        title: "Organizations",
        to: "/",
        type: "private",
        index: true,
      },
    ],
  },
  {
    component: RegisterOrganization,
    path: "/organization-admin/organization-profile",
    title: "register-organization",
    to: "/",
    type: "public",
    children: [],
  },
];
export default Routes;
