const Department = require("../models/department");

const departmentController = {
    async create(req, res) {
        try {
            req.body.createdBy = req.user._id;
            req.body.organization = '64e43ba127e762b8eee50d47'
            const department = new Department(req.body);
            await department.save();
            res.status(201).json({ department, message: 'Department created successfully.' });
        } catch (error) {
            console.error("departmentController:create:error -", error);
            res.status(400).json(error);
        }
    },
    async update(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            req.body.organization = '64e43ba127e762b8eee50d47'
            const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json({ department, message: 'Department deleted successfully' });
        } catch (error) {
            console.error("departmentController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async delete(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            const department = await Department.findByIdAndUpdate(req.params.id, { isDeleted: true });
            res.status(200).json({ message: 'Department deleted successfully' });
        } catch (error) {
            console.error("departmentController:delete:error -", error);
            res.status(400).json(error);
        }
    },
    async detail(req, res) {
        try {
            let department = await Department.findOne({ _id: req.params.id, isDeleted: false }).populate('organization');
            await department.save();
            res.status(201).json({ department, message: 'Department created successfully.' });
        } catch (error) {
            console.error("departmentController:detail:error -", error);
            res.status(400).json(error);
        }
    },
    async list(req, res) {
        try {

            if (!req.params.orgid) {
                return res.status(400).json({ message: 'Please provide Organization Id' });
            }
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, organization: req.params.orgid };

            if (req.query.searchKey) {
                filters.$or = [
                    { name: { $regex: req.query.searchKey, $options: 'i' } },
                    { description: { $regex: req.query.searchKey, $options: 'i' } }
                ];
            }
            const departments = await Department.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ createdAt: -1 });

            const totalDepartments = await Department.countDocuments(filters);
            const totalPages = Math.ceil(totalDepartments / req.query.limit);

            res.status(200).json({
                departments,
                totalDepartments,
                currentPage: page,
                totalPages,
                message: 'Departments fetched successfully'
            });
        } catch (error) {
            console.error("departmentController:list:error -", error);
            res.status(400).json(error);
        }
    },
}
module.exports = departmentController