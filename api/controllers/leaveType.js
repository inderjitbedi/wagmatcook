const EmployeeLeaveAllocation = require("../models/employeeLeaveAllocation");
const LeaveType = require("../models/leaveType");

const leaveTypeController = {
    async create(req, res) {
        try {
            req.body.createdBy = req.user._id;
            req.body.organization = req.organization?._id || null
            const leaveType = new LeaveType(req.body);
            await leaveType.save();
            res.status(201).json({ leaveType, message: 'Leave type created successfully.' });
        } catch (error) {
            console.error("leaveTypeController:create:error -", error);
            res.status(400).json(error);
        }
    },
    async update(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            req.body.organization = req.organization?._id || null
            const leaveType = await LeaveType.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json({ leaveType, message: 'Leave type updated successfully' });
        } catch (error) {
            console.error("leaveTypeController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async delete(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            const leaveType = await LeaveType.findByIdAndUpdate(req.params.id, { isDeleted: true });
            res.status(200).json({ message: 'Leave type deleted successfully' });
        } catch (error) {
            console.error("leaveTypeController:delete:error -", error);
            res.status(400).json(error);
        }
    },
    async detail(req, res) {
        try {
            let leaveType = await LeaveType.findOne({ _id: req.params.id, isDeleted: false }).populate('organization');
            await leaveType.save();
            res.status(200).json({ leaveType, message: 'Leave type details fetched successfully.' });
        } catch (error) {
            console.error("leaveTypeController:detail:error -", error);
            res.status(400).json(error);
        }
    },
    async list(req, res) {
        try {
            // if (!req.params.orgid) {
            //     return res.status(400).json({ message: 'Please provide Organization Id' });
            // }

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 9999;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, organization: req.organization?._id || null, isDefault: false };
            if (req.route.path.indexOf('defaults') > -1) {
                filters.isDefault = true;
            }
            if (req.query.searchKey) {
                filters.$or = [
                    { name: { $regex: req.query.searchKey, $options: 'i' } },
                    { description: { $regex: req.query.searchKey, $options: 'i' } }
                ];
            }
            const leaveTypes = await LeaveType.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ order: 1 });

            const totalLeaveTypes = await LeaveType.countDocuments(filters);
            const totalPages = Math.ceil(totalLeaveTypes / req.query.limit);

            res.status(200).json({
                leaveTypes,
                totalLeaveTypes,
                currentPage: page,
                totalPages,
                message: 'Leave types fetched successfully'
            });
        } catch (error) {
            console.error("leaveTypeController:list:error -", error);
            res.status(400).json(error);
        }
    },
    async employeeLeaveTypeList(req, res) {
        try {
            // if (!req.params.orgid) {
            //     return res.status(400).json({ message: 'Please provide Organization Id' });
            // }
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 9999;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, isActive: true, organization: req.organization?._id || null };

            if (req.query.searchKey) {
                filters.$or = [
                    { name: { $regex: req.query.searchKey, $options: 'i' } },
                    { description: { $regex: req.query.searchKey, $options: 'i' } }
                ];
            }

            const existingLeaveTypes = await EmployeeLeaveAllocation.find({ employee: req.params.employeeid, isDeleted: false }).distinct('leaveType');
            if (existingLeaveTypes && existingLeaveTypes.length) {
                filters._id = { $nin: existingLeaveTypes }
            }
            const leaveTypes = await LeaveType.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ order: 1 });

            const totalLeaveTypes = await LeaveType.countDocuments(filters);
            const totalPages = Math.ceil(totalLeaveTypes / req.query.limit);

            res.status(200).json({
                leaveTypes,
                totalLeaveTypes,
                currentPage: page,
                totalPages,
                message: 'Leave types fetched successfully'
            });
        } catch (error) {
            console.error("leaveTypeController:list:error -", error);
            res.status(400).json(error);
        }
    },
    async reorder(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            let leaveTypes = req.body.leaveTypes
            leaveTypes.forEach(async (leaveType, i) => {
                await LeaveType.findByIdAndUpdate(leaveType, { order: i + 1 });
            });
            const page = 1;
            const limit = 10;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, organization: req.organization?._id || null };

            leaveTypes = await LeaveType.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ order: 1 });

            const totalLeaveTypes = await LeaveType.countDocuments(filters);
            const totalPages = Math.ceil(totalLeaveTypes / req.query.limit);

            res.status(200).json({
                leaveTypes,
                totalLeaveTypes,
                currentPage: page,
                totalPages, message: 'Leave types reordered successfully'
            });
        } catch (error) {
            console.error("\n\leaveTypeController:reorder:error -", error);
            res.status(400).json({ message: error.toString() });;
        }
    },
}
module.exports = leaveTypeController