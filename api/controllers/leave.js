const EmployeeLeaveAllocation = require("../models/employeeLeaveAllocation");
const EmployeeLeaveHistory = require("../models/employeeLeaveHistory");
const LeaveType = require("../models/leaveType");

const leaveController = {

    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, responder: req.user._id };

            if (req.query.searchKey) {
                filters.$or = [
                    { name: { $regex: req.query.searchKey, $options: 'i' } },
                    { description: { $regex: req.query.searchKey, $options: 'i' } }
                ];
            }
            const leaves = await EmployeeLeaveHistory.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ createdAt: -1 });

            const totalLeaves = await EmployeeLeaveHistory.countDocuments(filters);
            const totalPages = Math.ceil(totalLeaves / req.query.limit);

            res.status(200).json({
                leaves,
                totalLeaves,
                currentPage: page,
                totalPages,
                message: 'Leave requests fetched successfully'
            });
        } catch (error) {
            console.error("leaveTypeController:list:error -", error);
            res.status(400).json(error);
        }
    },

}
module.exports = leaveController