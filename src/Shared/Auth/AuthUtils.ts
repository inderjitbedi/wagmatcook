import ROLES from "../../constants/roles";

const redirectToDashboard = (role: any, navigate: any) => {
  switch (role) {
    case ROLES.SUPER_ADMIN:
      navigate("/super-admin/organizations");
      break;
    case ROLES.ORG_ADMIN:
      navigate("/organization-admin/dashboard");
      break;
    case ROLES.HR:
      navigate("/hr-management/dashboard");
      break;
    case ROLES.PAYROLL:
      navigate("/payroll-management/dashboard");
      break;
    case ROLES.MANAGER:
      navigate("/manager-management/dashboard");
      break;
    case ROLES.EMPLOYEE:
      navigate("/user-management/dashboard");
      break;
    default:
      navigate("/"); // Redirect to a default page for unknown roles
      break;
  }
};
export default redirectToDashboard;

// module.exports = { redirectToDashboard };
