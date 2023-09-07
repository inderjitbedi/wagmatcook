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
import Employee from "../Employee/ViewEmployee/Employee";
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
import EmployeeLayout from "../Employee/ViewEmployee/EmployeeLayout";
import AddEmployeeLayout from "../Employee/AddEmployee/AddEmployeeLayout";
const Routes = [
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
        component: Employee,
        path: "employee",
        title: "Employee ",
        to: "/",
        type: "private",
        index: true,
      },
    ],
  },
  {
    component: EmployeeLayout,
    path: "/employee-details",
    title: "Disciplinary ",
    to: "/",
    type: "private",
    children: [
      {
        component: EmployeePersonal,
        path: "personal",
        title: "EmployeePersonal ",
        to: "/",
        type: "private",
        index: true,
      },

      {
        component: EmployeeJobDetails,
        path: "job-details",
        title: "EmployeeJobDetails ",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: EVBenefits,
        path: "benefits",
        title: "Benefits ",
        to: "/",
        type: "private",
        index: true,
      },

      {
        component: EVLeaveHistory,
        path: "leave-history",
        title: "EVLeaveHistory ",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: EVCertificates,
        path: "certificates",
        title: "EVCertificates ",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: EVDiscipline,
        path: "discipline",
        title: "EVDiscipline ",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: EVDocuments,
        path: "documents",
        title: "EVDocuments ",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: EVPerformance,
        path: "performance",
        title: "EVPerformance ",
        to: "/",
        type: "private",
        index: true,
      },
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
    children: [
      {
        component: Benefits,
        path: "benefits",
        title: "Benefits ",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: CertificatesInfo,
        path: "certificatesInfo",
        title: "CertificatesInfo ",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: JobDetails,
        path: "job-details",
        title: "JobDetails ",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: PersonalInfo,
        path: "personal-info",
        title: "PersonalInfo ",
        to: "/",
        type: "private",
        index: true,
      },
    ],
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
