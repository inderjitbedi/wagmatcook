const EmployeeType = require("../models/employeeType");

const employeeTypeController = {
    async create(req, res) {
        try {
            req.body.createdBy = req.user._id;
            req.body.organization = req.organization?._id || null
            const employeeType = new EmployeeType(req.body);
            await employeeType.save();
            res.status(201).json({ employeeType, message: 'Employee Type created successfully.' });
        } catch (error) {
            console.error("employeeTypeController:create:error -", error);
            res.status(400).json(error);
        }
    },
    async update(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            req.body.organization = req.organization?._id || null
            const employeeType = await EmployeeType.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json({ employeeType, message: 'Employee Type updated successfully' });
        } catch (error) {
            console.error("employeeTypeController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async delete(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            const employeeType = await EmployeeType.findByIdAndUpdate(req.params.id, { isDeleted: true });
            res.status(200).json({ message: 'Employee Type deleted successfully' });
        } catch (error) {
            console.error("employeeTypeController:delete:error -", error);
            res.status(400).json(error);
        }
    },
    async detail(req, res) {
        try {
            let employeeType = await EmployeeType.findOne({ _id: req.params.id, isDeleted: false }).populate('organization');
            await employeeType.save();
            res.status(201).json({ employeeType, message: 'Employee Type created successfully.' });
        } catch (error) {
            console.error("employeeTypeController:detail:error -", error);
            res.status(400).json(error);
        }
    },
    async list(req, res) {
        try {

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
            const employeeTypes = await EmployeeType.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ order: 1 });

            const totalEmployeeTypes = await EmployeeType.countDocuments(filters);
            const totalPages = Math.ceil(totalEmployeeTypes / req.query.limit);

            res.status(200).json({
                employeeTypes,
                totalEmployeeTypes,
                currentPage: page,
                totalPages,
                message: 'Employee Types fetched successfully'
            });
        } catch (error) {
            console.error("employeeTypeController:list:error -", error);
            res.status(400).json(error);
        }
    },
    async reorder(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            let employeeTypes = req.body.employeeTypes
            employeeTypes.forEach(async (employeeType, i) => {
                await EmployeeType.findByIdAndUpdate(employeeType, { order: i + 1 });
            });
            const page = 1;
            const limit = 10;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, organization: req.organization?._id || null };

            employeeTypes = await EmployeeType.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ order: 1 });

            const totalEmployeeTypes = await EmployeeType.countDocuments(filters);
            const totalPages = Math.ceil(totalEmployeeTypes / req.query.limit);

            res.status(200).json({
                employeeTypes,
                totalEmployeeTypes,
                currentPage: page,
                totalPages, message: 'Employee types reordered successfully'
            });
        } catch (error) {
            console.error("\n\employeeTypeController:reorder:error -", error);
            res.status(400).json({ message: error.toString() });;
        }
    },
}
module.exports = employeeTypeController