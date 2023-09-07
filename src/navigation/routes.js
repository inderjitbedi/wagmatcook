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
    type: "public",
    children: [],
  },
  {
    component: OADashBoard,
    path: "/OADashBoard",
    title: "OADashBoard",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: OADashBoardNext,
    path: "/OADashBoardNext",
    title: "OADashBoardNext",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: Departments,
    path: "/Departments",
    title: "Departments",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: Disciplinary,
    path: "/Disciplinary",
    title: "Disciplinary ",
    to: "/",
    type: "public",
    children: [],
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
    component: Benefits,
    path: "/Benefits",
    title: "Benefits ",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: CertificatesInfo,
    path: "/CertificatesInfo",
    title: "CertificatesInfo ",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: JobDetails,
    path: "/JobDetails",
    title: "JobDetails ",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: PersonalInfo,
    path: "/PersonalInfo",
    title: "PersonalInfo ",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: Employee,
    path: "/Employee",
    title: "Employee ",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: EmployeeJobDetails,
    path: "/EmployeeJobDetails",
    title: "EmployeeJobDetails ",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: EVLeaveHistory,
    path: "/EVLeaveHistory",
    title: "EVLeaveHistory ",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: EmployeePersonal,
    path: "/EmployeePersonal",
    title: "EmployeePersonal ",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: EVBenefits,
    path: "/EVBenefits",
    title: "EVBenefits ",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: EVCertificates,
    path: "/EVCertificates",
    title: "EVCertificates ",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: EVDiscipline,
    path: "/EVDiscipline",
    title: "EVDiscipline ",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: EVDocuments,
    path: "/EVDocuments",
    title: "EVDocuments ",
    to: "/",
    type: "public",
    children: [],
  },
  {
    component: EVPerformance,
    path: "/EVPerformance",
    title: "EVPerformance ",
    to: "/",
    type: "public",
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
        index: true
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
