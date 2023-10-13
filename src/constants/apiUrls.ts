const API_URLS = {
  login: `/auth/login`,
  loginWithOtp: `/auth/login-with-otp`,
  resendOtp: `/auth/resend-otp/:email`,
  verifyOtp: `/auth/verify-otp`,

  adminOrganizationList: `/super-admin/organization-list`,
  adminInviteOrganizationAdmin: `/super-admin/invite`,

  orgAdminCompleteSignup: `/organization-admin/complete-signup/:token`,
  // file upload documents api
  uploadDocuments: `/employee/file/upload/:type`,
  uploadImage: `/organization/file/upload/image`,
  // Oa Benefits routes
  getOaBenefits: `/benefit/list?page=Page&limit=10&searchKey=searchValue`,
  createBenefits: `/benefit/create`,
  deleteBenefits: `/benefit/delete/:id`,
  updateBenefits: `/benefit/update/:id`,
  reorderBenefits: `/benefit/reorder`,
  //Oa Departmnets
  getDpartments: `/department/list?page=Page&limit=10&searchKey=searchValue`,
  createDepartments: `/department/create`,
  updateDepartments: `/department/update/:id`,
  deleteDepartments: `/department/delete/:id`,
  // Oa disciplinary
  getDisciplinary: `/disciplinary/list?page=Page&limit=10&searchKey=searchValue`,
  createDisciplinary: `/disciplinary/create/`,
  updateDisciplinary: `/disciplinary/update/:id`,
  deleteDisciplinary: `/disciplinary/delete/:id`,
  reorderDisciplinary: `/disciplinary/reorder`,
  // Leave Type oa route
  getLeaveType: `/leave-type/list?page=Page&limit=10&searchKey=searchValue`,
  createLeaveType: `/leave-type/create`,
  updateLeaveType: `/leave-type/update/:id`,
  deleteLeaveType: `/leave-type/delete/:id`,
  reorderLeaveType: `/leave-type/reorder`,
  // employee add benefits
  submitEmployeeBenefits: `/employee/benefit/:employeeid`,
  getEmployeeBenefitsList: `/benefit/list`,
  getEmployeeBenefits: `/employee/benefit/:employeeid`,
  // employee add certificates
  submitEmployeeCertificates: `/employee/certificates/:employeeid`,
  getEmployeeCertificates: `/employee/certificates/:employeeid`,
  addSingleEmployeeCertificate: `/employee/certificate/:employeeid`,
  updateEmployeeCertificate: `/employee/certificate/:employeeid/:id`,
  deleteEmployeeCertificates: `/employee/certificate/:employeeid/delete/:id`,
  // employee add jobdetails api
  getReporttoList: `/employee/reports-to-list`,
  getEmployeeJobDetails: `/employee/job-details/:employeeid`,
  submitEmployeeJobDetails: `/employee/job-details/:employeeid`,
  getDepartmentsList: `/department/list`,
  getEmployeeTypeList: `/employee-type/list`,
  addSinglePsoitionDetail: `/employee/job-details/position/:employeeid`,
  //employee add personal info api
  getEmployeePersonalInfo: `/employee/personal-info/:employeeid`,
  submitEmployeePersonalInfo: `/employee/personal-info/:employeeid`,
  // employee types
  getEmployeeTypes: `/employee-type/list?page=Page&limit=10&searchKey=searchValue`,
  deleteEmployeeTypes: `/employee-type/delete/:id`,
  createEmployeeTypes: `/employee-type/create`,
  updateEmployeeTypes: `/employee-type/update/:id`,
  reorderEmployeeType: `/employee-type/reorder`,
  // employee disciplinary api
  submitEmployeeDisciplinary: `/employee/disciplinary/:employeeid`,
  getDisciplinaryList: `/disciplinary/list`,
  EmployeeDisciplinary: `/employee/disciplinaries/:employeeid`,
  getEmployeeDisciplinary: `/employee/disciplinary/:employeeid/:id`,

  deleteEmployeeDisciplinary: `/employee/disciplinary/:employeeid/delete/:id`,

  // employee performance
  submitEmployeePerformance: `/employee/review/:employeeid`,
  EmployeePerformance: `/employee/reviews/:employeeid`,
  addEmployeePerformance: `/employee/review/:employeeid/:id`,
  deleteEmployeePerformance: `/employee/review/:employeeid/delete/:id`,
  suggestionList: `/employee/completed-by-list`,
  // employee leave hsitory
  getLeaveTypeList: `/leave-type/list`,
  submitEmployeeLeaveHistory: `/employee/leave-history/:employeeid/request`,
  getLeaveHistory: `/employee/leave-history/:employeeid`,
  //employee allocation
  submitEmployeeAllocation: `/employee/leave-allocation/:employeeid`,
  getEmployeeLeaveList: `/leave-type/employee-list/:employeeid`,
  EmployeeAllocation: `/employee/leave-allocations/:employeeid`,

  getEmployeeAllocation: `/employee/leave-allocation/:employeeid/:id`,
  deleteEmployeeAllocation: `/employee/leave-allocation/:employeeid/delete/:id`,
  // employee Documents
  getEmployeeDocuments: `/employee/documents/:employeeid`,
  deleteEmployeeDocument: `/employee/documents/:employeeid/delete/:id`,
  // leaves api
  getLeaves: `/leave/history`,
  getLeaveDetails: `/leave/history/:employeeid/:requestid`,
  respondLeave: `/leave/history/:employeeid/:requestid/respond`,
  //notification api
  getNotificationList: `/notification/list`,
  getNotificationCount: `/notification/unread-count`,
  notificationReadAll: `/notification/read-all`,
  markReadNotification: `/notification/mark-read`,
  // active user
  getActiveUser: `employee/active-list`,
  // org profile settings api
  getOrgProfile: `/organization/details`,
  updateOrgProfile: `/organization/update`,
  // user accout api
  userLeaveBalance: `/employee/leave-balance`,
  // employee list api
  getEmployeeList: `/employee/list?page=Page&limit=10`,
  deleteEmployeeList: `/employee/delete/Id`,
  //task apis
  getTaskList: `/task/list?page=Page&limit=10`,
  updateTask: `/task/update/:id`,
  deleteTask: `/task/delete/:id`,
  createTask: `/task/create`,
  getAssignees: `/task/assignees`,
  getTaskDetails: `/task/details/:id`,
  markCompleted:`/task//mark-complete/:id`,
  // comments Aopi routes
  getTaskComments: `/task/:taskid/comments`,
  updateTaskComments: `/task/:taskid/comment/:id/update`,
  createTaskComments: `/task/:taskid/comment/add`,
  deleteTaskComments: `/task/:taskid/comment/:id/delete`,
};

export default API_URLS;
