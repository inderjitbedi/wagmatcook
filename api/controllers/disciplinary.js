const Disciplinary = require("../models/disciplinary");

const disciplinaryController = {
    async create(req, res) {
        try {
            req.body.createdBy = req.user._id;
            req.body.organization = req.organization?._id || null
            const disciplinary = new Disciplinary(req.body);
            await disciplinary.save();
            res.status(201).json({ disciplinary, message: 'Disciplinary type created successfully.' });
        } catch (error) {
            console.error("disciplinaryController:create:error -", error);
            res.status(400).json(error);
        }
    },
    async update(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            req.body.organization = req.organization?._id || null
            const disciplinary = await Disciplinary.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json({ disciplinary, message: 'Disciplinary type updated successfully' });
        } catch (error) {
            console.error("disciplinaryController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async delete(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            const disciplinary = await Disciplinary.findByIdAndUpdate(req.params.id, { isDeleted: true });
            res.status(200).json({ message: 'Disciplinary type deleted successfully' });
        } catch (error) {
            console.error("disciplinaryController:delete:error -", error);
            res.status(400).json(error);
        }
    },
    async detail(req, res) {
        try {
            let disciplinary = await Disciplinary.findOne({ _id: req.params.id, isDeleted: false }).populate('organization');
            await disciplinary.save();
            res.status(201).json({ disciplinary, message: 'Disciplinary created successfully.' });
        } catch (error) {
            console.error("disciplinaryController:detail:error -", error);
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

            let filters = { isDeleted: false, organization: req.organization?._id || null, isDefault: { $ne: true } };
            if (req.route.path.indexOf('defaults') > -1) {
                filters.isDefault = true;
            }
            if (req.query.searchKey) {
                filters.$or = [
                    { name: { $regex: req.query.searchKey, $options: 'i' } },
                    { description: { $regex: req.query.searchKey, $options: 'i' } }
                ];
            }
            const disciplinaries = await Disciplinary.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ order: 1 });

            const totalDisciplinaries = await Disciplinary.countDocuments(filters);
            const totalPages = Math.ceil(totalDisciplinaries / req.query.limit);

            res.status(200).json({
                disciplinaries,
                totalDisciplinaries,
                currentPage: page,
                totalPages,
                message: 'Disciplinaries fetched successfully'
            });
        } catch (error) {
            console.error("disciplinaryController:list:error -", error);
            res.status(400).json(error);
        }
    },
    async reorder(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            let disciplinaries = req.body.disciplinaries
            disciplinaries.forEach(async (disciplinary, i) => {
                await Disciplinary.findByIdAndUpdate(disciplinary, { order: i + 1 });
            });
            const page = 1;
            const limit = 10;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, organization: req.organization?._id || null };

            if (req.query.searchKey) {
                filters.$or = [
                    { name: { $regex: req.query.searchKey, $options: 'i' } },
                    { description: { $regex: req.query.searchKey, $options: 'i' } }
                ];
            }
            disciplinaries = await Disciplinary.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ order: 1 });

            const totalDisciplinaries = await Disciplinary.countDocuments(filters);
            const totalPages = Math.ceil(totalDisciplinaries / req.query.limit);

            res.status(200).json({
                disciplinaries,
                totalDisciplinaries,
                currentPage: page,
                totalPages, message: 'Disciplinaries reordered successfully'
            });
        } catch (error) {
            console.error("\n\disciplinaryController:reorder:error -", error);
            res.status(400).json({ message: error.toString() });;
        }
    },
}
module.exports = disciplinaryController