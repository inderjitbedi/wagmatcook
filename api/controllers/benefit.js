const Benefit = require("../models/benefit");

const benefitController = {
    async create(req, res) {
        try {
            req.body.createdBy = req.user._id;
            req.body.organization = req.organization._id
            const benefit = new Benefit(req.body);
            await benefit.save();
            res.status(201).json({ benefit, message: 'Benefit created successfully.' });
        } catch (error) {
            console.error("benefitController:create:error -", error);
            res.status(400).json(error);
        }
    },
    async update(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            req.body.organization = req.organization._id
            const benefit = await Benefit.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json({ benefit, message: 'Benefit deleted successfully' });
        } catch (error) {
            console.error("benefitController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async delete(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            const benefit = await Benefit.findByIdAndUpdate(req.params.id, { isDeleted: true });
            res.status(200).json({ message: 'Benefit deleted successfully' });
        } catch (error) {
            console.error("benefitController:delete:error -", error);
            res.status(400).json(error);
        }
    },
    async detail(req, res) {
        try {
            let benefit = await Benefit.findOne({ _id: req.params.id, isDeleted: false }).populate('organization');
            await benefit.save();
            res.status(201).json({ benefit, message: 'Benefit created successfully.' });
        } catch (error) {
            console.error("benefitController:detail:error -", error);
            res.status(400).json(error);
        }
    },
    async list(req, res) {
        try {

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, organization : req.organization._id };

            if (req.query.searchKey) {
                filters.$or = [
                    { name: { $regex: req.query.searchKey, $options: 'i' } },
                    { description: { $regex: req.query.searchKey, $options: 'i' } }
                ];
            }
            const benefits = await Benefit.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ createdAt: -1 });

            const totalBenefits = await Benefit.countDocuments(filters);
            const totalPages = Math.ceil(totalBenefits / req.query.limit);

            res.status(200).json({
                benefits,
                totalBenefits,
                currentPage: page,
                totalPages,
                message: 'Benefits fetched successfully'
            });
        } catch (error) {
            console.error("benefitController:list:error -", error);
            res.status(400).json(error);
        }
    },
}
module.exports = benefitController