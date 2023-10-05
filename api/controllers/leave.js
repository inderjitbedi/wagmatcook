const notificationConstants = require("../constants/notificationConstants");
const leaveStatus = require("../enum/leaveStatus");
const notificationType = require("../enum/notificationType");
const EmployeeLeaveAllocation = require("../models/employeeLeaveAllocation");
const EmployeeLeaveHistory = require("../models/employeeLeaveHistory");
const LeaveType = require("../models/leaveType");
const Notifications = require("../models/notification");
const User = require("../models/user");

const leaveController = {

    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, responder: req.user._id };

            // if (req.query.searchKey) {
            //     filters.$or = [
            //         { name: { $regex: req.query.searchKey, $options: 'i' } },
            //         { description: { $regex: req.query.searchKey, $options: 'i' } }
            //     ];
            // }
            const leaves = await EmployeeLeaveHistory.find(filters).populate([{
                path: 'employee',
                populate: {
                    path: 'personalInfo',
                    populate: {
                        path: 'photo'
                    }
                }
            },
            {
                path: 'responder',
                populate: {
                    path: 'personalInfo',
                }
            }, {
                path: 'leaveType'
            }])
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
    async respondLeaveRequest(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id }).populate('personalInfo')
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }


            let { leaveType } = req.body
            let allocation = await EmployeeLeaveAllocation.findOne({ leaveType, employee: req.params.id, isDeleted: false }).populate('leaveType')
            if (!allocation)
                return res.status(400).json({ message: 'Leave type not allocated.' });



            let burnedHours = 0;
            let requestedHours = 0;
            let leaves = await EmployeeLeaveHistory.find({ leaveType: leaveType, employee: req.params.id, isDeleted: false }).select('hours');
            for (const leave of leaves) {
                if (leave._id === req.params.requestid) {
                    requestedHours = leave.hours
                }
                burnedHours += leave.hours
            }

            console.log(allocation.leaveType.name, allocation?.totalAllocation);
            console.log(requestedHours, burnedHours);
            if (req.body.isApproved && (requestedHours > (allocation?.totalAllocation - burnedHours))) {
                return res.status(400).json({ message: 'Insufficent balance' });
            }

            let payload = {
                ...req.body,
                employee: req.params.id,
                responder: req.user._id,
                status: req.body.isApproved ? leaveStatus.APPROVED : leaveStatus.REJECTED
            }

            const request = await EmployeeLeaveHistory.findOneAndUpdate({ _id: req.params.requestid }, payload);
            await request.save();

            let type = req.body.isApproved ? notificationType.LEAVE_APPROVED : notificationType.LEAVE_REJECTED
            const notification = new Notifications({
                title: notificationConstants[type].title?.replace('{responder}', [req.user?.personalInfo.firstName, req.user?.personalInfo.lastName].join(' ')).replace('{leavetype}', allocation.leaveType.name) || '',
                description: notificationConstants[type].description || '',
                type: type,
                sender: req.user._id,
                receiver: req.params.id
            });
            await notification.save();

            res.status(200).json({
                message: `Employee leave request ${req.body.isApproved ? 'approved' : 'rejected'} successfully`
            });
        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },

}
module.exports = leaveController