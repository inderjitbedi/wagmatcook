
const API_URLS = {
    login: `/auth/login`,
    loginWithOtp:`/auth/login-with-otp`,
    resendOtp:`/auth/resend-otp/:email`,
    verifyOtp:`/auth/verify-otp`,

    adminOrganizationList:`/super-admin/organization-list`,
    adminInviteOrganizationAdmin:`/super-admin/invite`,
    orgAdminCompleteSignup:`/organization-admin/complete-signup/:token`

};

export default API_URLS;