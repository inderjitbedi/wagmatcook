// import login from "../features/auth/pages/login";
import signup from "../features/auth/pages/orgAdmin/signup";
import signin from "../features/auth/shared/signin";
import verifyuser from "../features/auth/pages/orgAdmin/verifyuser";
import RegisterOrganization from "../features/auth/pages/orgAdmin/orgRegister";

// import verify from "../features/auth/pages/verify"

const Routes = [
    {
        component: signup,
        path: "/",
        title: "Org Admin Register",
        to: "/register-organization",
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

    },
    {
        component: verifyuser,
        path: "/verifyuser",
        title: "verifyuser",
        to: "/",
        type: "semi",
        children: []

    }, {
        component: RegisterOrganization,
        path: "/register-organization",
        title: "register-organization",
        to: "/",
        type: "private",
        children: []

    },
];

export default Routes;
