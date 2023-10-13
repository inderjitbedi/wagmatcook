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
import OABenefits from "../Benefits/OABenefits";
import EmployeeTypes from "../Employee/EmployeeType/EmployeeTypes";
import OALeaves from "../Leaves/OaLeaves/OALeaves";
import ManagerLeaves from "../Leaves/ManagerLeaves/ManagerLeaves";
import ManagerSideBar from "../Dashboard/ManagerDashboard/ManagerSideBar";
import ManagerLayout from "../Dashboard/ManagerDashboard/ManagerLayout";
import EvLeaveAlloacation from "../Employee/ViewEmployee/EvLeaveAlloacation";
import ManagerDashBoard from "../Dashboard/ManagerDashboard/ManagerDashBoard";
import ManagerEmployeeLayout from "../Employee/ManagerEmployee/ManagerEmployeeLayout";
import ManagerAccountLayout from "../Account/ManagerAccountLayout";
import ManagerLeaveAction from "../Leaves/ManagerLeaves/ManagerLeaveAction";
import HRLayout from "../Dashboard/HRDashboard/HRLayout";
import HREmployeeLayout from "../Employee/HREmployee/HREmployeeLayout";
import HRAccountLayout from "../Account/HRAccountLayout";
import UserLayout from "../Dashboard/UserDashboard/UserLayout";
import UserAccountLayout from "../Account/UserAccountLayout";
import Task from "../Task/Task";
import TaskView from "../Task/TaskView";
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
        component: OABenefits,
        path: "benefits",
        title: "Benefits",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: OALeaves,
        path: "leaves",
        title: "Leaves",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: EmployeeTypes,
        path: "employee-types",
        title: "Employee Types",
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
        component: Task,
        path: "tasks",
        title: "tasks",
        to: "/",
        type: "private",
        index: true,
      },
       {
        component: TaskView,
        path: "tasks-view/:taskid",
        title: "Tasks View",
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
                component: EvLeaveAlloacation,
                path: "leave-alloacation/:employeeid",
                title: "Leave Alloaction",
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
            path: "benefits/:employeeid/:edit?",
            title: "Benefits ",
            to: "/",
            type: "private",
          },
          {
            component: CertificatesInfo,
            path: "certificates-info/:employeeid/:edit?",
            title: "CertificatesInfo ",
            to: "/",
            type: "private",
          },
          {
            component: JobDetails,
            path: "job-details/:employeeid/:edit?",
            title: "JobDetails ",
            to: "/",
            type: "private",
          },
          {
            component: PersonalInfo,
            path: "personal-info/:employeeid/:edit?",
            title: "PersonalInfo ",
            to: "/",
            type: "private",
          },
        ],
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
    component: ManagerLayout,
    path: "/manager-management",
    title: "Manager",
    to: "/",
    type: "private",
    children: [
      {
        component: ManagerDashBoard,
        path: "dashboard",
        title: "Manager DashBoard",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: ManagerLeaves,
        path: "leaves",
        title: "Leaves",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: ManagerLeaveAction,
        path: "leaves-request/:employeeid/:requestid",
        title: "Leaves",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: EmployeeList,
        path: "employee-list",
        title: "Employee List",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: ManagerEmployeeLayout,
        path: "employee-details",
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
            component: EvLeaveAlloacation,
            path: "leave-alloacation/:employeeid",
            title: "Leave Alloaction",
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
        path: "benefits/:employeeid/:edit?",
        title: "Benefits ",
        to: "/",
        type: "private",
      },
      {
        component: CertificatesInfo,
        path: "certificates-info/:employeeid/:edit?",
        title: "CertificatesInfo ",
        to: "/",
        type: "private",
      },
      {
        component: JobDetails,
        path: "job-details/:employeeid/:edit?",
        title: "JobDetails ",
        to: "/",
        type: "private",
      },
      {
        component: PersonalInfo,
        path: "personal-info/:employeeid/:edit?",
        title: "PersonalInfo ",
        to: "/",
        type: "private",
      },
      {
        component: ManagerAccountLayout,
        path: "account",
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
            component: EvLeaveAlloacation,
            path: "leave-alloacation/:employeeid",
            title: "Leave Alloaction",
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
    ],
  },
  {
    component: HRLayout,
    path: "/hr-management",
    title: "HUMAN_RESOURCE",
    to: "/",
    type: "private",
    children: [
      {
        component: ManagerDashBoard,
        path: "dashboard",
        title: "Manager DashBoard",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: ManagerLeaves,
        path: "leaves",
        title: "Leaves",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: ManagerLeaveAction,
         path:"leaves-request/:employeeid/:requestid",
        title: "Leaves",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: EmployeeList,
        path: "employee-list",
        title: "Employee List",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: HREmployeeLayout,
        path: "employee-details",
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
            component: EvLeaveAlloacation,
            path: "leave-alloacation/:employeeid",
            title: "Leave Alloaction",
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
        path: "benefits/:employeeid/:edit?",
        title: "Benefits ",
        to: "/",
        type: "private",
      },
      {
        component: CertificatesInfo,
        path: "certificates-info/:employeeid/:edit?",
        title: "CertificatesInfo ",
        to: "/",
        type: "private",
      },
      {
        component: JobDetails,
        path: "job-details/:employeeid/:edit?",
        title: "JobDetails ",
        to: "/",
        type: "private",
      },
      {
        component: PersonalInfo,
        path: "personal-info/:employeeid/:edit?",
        title: "PersonalInfo ",
        to: "/",
        type: "private",
      },
      {
        component: HRAccountLayout,
        path: "account",
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
            component: EvLeaveAlloacation,
            path: "leave-alloacation/:employeeid",
            title: "Leave Alloaction",
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
    ],
  },
  {
    component: UserLayout,
    path: "/user-management",
    title: "HUMAN_RESOURCE",
    to: "/",
    type: "private",
    children: [
      {
        component: ManagerDashBoard,
        path: "dashboard",
        title: "Manager DashBoard",
        to: "/",
        type: "private",
        index: true,
      },
      {
        component: EVLeaveHistory,
        path: "leaves/:employeeid?",
        title: "Leaves",
        to: "/",
        type: "private",
        index: true,
      },

      {
        component: Benefits,
        path: "benefits/:employeeid/:edit?",
        title: "Benefits ",
        to: "/",
        type: "private",
      },
      {
        component: CertificatesInfo,
        path: "certificates-info/:employeeid/:edit?",
        title: "CertificatesInfo ",
        to: "/",
        type: "private",
      },
      {
        component: JobDetails,
        path: "job-details/:employeeid/:edit?",
        title: "JobDetails ",
        to: "/",
        type: "private",
      },
      {
        component: PersonalInfo,
        path: "personal-info/:employeeid/:edit?",
        title: "PersonalInfo ",
        to: "/",
        type: "private",
      },
      {
        component: UserAccountLayout,
        path: "account",
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
            component: EvLeaveAlloacation,
            path: "leave-alloacation/:employeeid",
            title: "Leave Alloaction",
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
