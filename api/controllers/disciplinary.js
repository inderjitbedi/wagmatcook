const Disciplinary = require("../models/disciplinary");

const disciplinaryController = {
    async create(req, res) {
        try {
            req.body.createdBy = req.user._id;
            req.body.organization = '64e43ba127e762b8eee50d47'
            const disciplinary = new Disciplinary(req.body);
            await disciplinary.save();
            res.status(201).json({ disciplinary, message: 'Disciplinary created successfully.' });
        } catch (error) {
            console.error("disciplinaryController:create:error -", error);
            res.status(400).json(error);
        }
    },
    async update(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            req.body.organization = '64e43ba127e762b8eee50d47'
            const disciplinary = await Disciplinary.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json({ disciplinary, message: 'Disciplinary deleted successfully' });
        } catch (error) {
            console.error("disciplinaryController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async delete(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            const disciplinary = await Disciplinary.findByIdAndUpdate(req.params.id, { isDeleted: true });
            res.status(200).json({ message: 'Disciplinary deleted successfully' });
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
            res.json({ message: 'Disciplinaries reordered successfully' });
        } catch (error) {
            console.error("\n\disciplinaryController:reorder:error -", error);
            res.status(400).json({ message: error.toString() });;
        }
    },
}
module.exports = disciplinaryController