// import login from "../features/auth/pages/login";
import signup from "../features/auth/pages/orgAdmin/signup";
import signin from "../features/auth/shared/signin";
import verifyuser from "../features/auth/pages/orgAdmin/verifyuser";
import RegisterOrganization from "../features/auth/pages/orgAdmin/orgRegister";
import OADashBoard from "../Dashboard/OADashboard/OADashBoard";
import OADashBoardNext from "../Dashboard/OADashboard/OADashBoardNext";
import ForgotPassword from "../features/auth/shared/forgot-password";
import ResetPassword from "../features/auth/shared/reset-password";

// import verify from "../features/auth/pages/verify"
import Departments from "../Departments/Departments";
import Disciplinary from "../Disciplinary/Disciplinary";
const Routes = [
    {
        component: signup,
        path: "/",
        title: "Org Admin Register",
        to: "/",
        type: "public",
        children: []
        // children: [
        //     // {
        //     //   component: AddGolfCourse,
        //     //   path: "golf-course",
        //     //   title: "Golf Course | Register Account",
        //     //   to: "/",
        //     //   type: "private",
        //     // },
        // ]
    },
    {
        component: signin,
        path: "/signin",
        title: "Signin",
        to: "/",
        type: "public",
        children: []

    }, {
        component: ForgotPassword,
        path: "/forgot-password",
        title: "forgot-password",
        to: "/",
        type: "public",
        children: []

    }, {
        component: ResetPassword,
        path: "/reset-password/:token",
        title: "reset-password",
        to: "/",
        type: "public",
        children: []

    },
    {
        component: verifyuser,
        path: "/verifyuser",
        title: "verifyuser",
        to: "/",
        type: "public",
        children: []

    }, {
        component: RegisterOrganization,
        path: "/register-organization",
        title: "register-organization",
        to: "/",
        type: "public",
        children: []

    }, {
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
    component: Disciplinary ,
    path: "/Disciplinary",
    title: "Disciplinary ",
    to: "/",
    type: "public",
    children: [],
  },
];
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxva2VjZXk4MzZAcGJyaWRhbC5jb20iLCJpYXQiOjE2OTMyODA3Njl9.GZ3r-D6ZSLGNotrxHTNU0eLxo210hFz61od7bSTYq6I
export default Routes;
