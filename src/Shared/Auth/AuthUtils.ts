import ROLES from "../../constants/roles";

const redirectToDashboard = (role: any, navigate: any) => {
    switch (role) {
        case ROLES.SUPER_ADMIN:
            navigate('/super-admin/organizations');
            break;
        case ROLES.ORG_ADMIN:
            navigate('/organization-admin/dashboard');
            break;
        default:
            navigate('/'); // Redirect to a default page for unknown roles
            break;
    }
};
export default redirectToDashboard;

// module.exports = { redirectToDashboard };