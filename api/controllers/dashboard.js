const leaveStatus = require("../enum/leaveStatus");
const EmployeeCertificates = require("../models/employeeCertificates");
const EmployeeLeaveHistory = require("../models/employeeLeaveHistory");

const dashboardController = {

    async hrData(req, res) {
        try {

            let filters = { isDeleted: false, responder: req.user._id, status: leaveStatus.PENDING };

            const leaves = await EmployeeLeaveHistory.find(filters).populate([{
                path: 'employee',
                populate: {
                    path: 'personalInfo',
                    populate: {
                        path: 'photo'
                    }
                }
            }, {
                path: 'leaveType'
            }]).sort({ createdAt: -1 });


            const today = new Date();
            const oneWeekFromNow = new Date(today);
            oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Add 7 days to today's date

            const certificates = await EmployeeCertificates.find({
                employee: req.user._id,
                expiryDate: {
                    $gte: today,
                    $lt: oneWeekFromNow,
                },
            });


            res.status(200).json({
                leaves,
                certificates,
                // usersWithUpcomingBirthdays,

                message: 'Dashboard data fetched successfully'
            });
        } catch (error) {
            console.error("departmentController:list:error -", error);
            res.status(400).json(error);
        }
    },
}
module.exports = dashboardController