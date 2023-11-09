const DocumentTags = require("../models/documentTags");

const documentTagController = {
    async create(req, res) {
        try {
            req.body.createdBy = req.user._id;
            req.body.organization = req.organization?._id || null
            const documentTag = new DocumentTags(req.body);
            await documentTag.save();
            res.status(201).json({ documentTag, message: 'Document Tag created successfully.' });
        } catch (error) {
            console.error("documentTagController:create:error -", error);
            res.status(400).json(error);
        }
    },
    async update(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            req.body.organization = req.organization?._id || null
            const documentTag = await DocumentTags.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json({ documentTag, message: 'Document Tag updated successfully' });
        } catch (error) {
            console.error("documentTagController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async delete(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            const documentTag = await DocumentTags.findByIdAndUpdate(req.params.id, { isDeleted: true });
            res.status(200).json({ message: 'Document Tag deleted successfully' });
        } catch (error) {
            console.error("documentTagController:delete:error -", error);
            res.status(400).json(error);
        }
    },
    async detail(req, res) {
        try {
            let documentTag = await DocumentTags.findOne({ _id: req.params.id, isDeleted: false }).populate('organization');
            await documentTag.save();
            res.status(201).json({ documentTag, message: 'Document Tag fetched successfully.' });
        } catch (error) {
            console.error("documentTagController:detail:error -", error);
            res.status(400).json(error);
        }
    },
    async list(req, res) {
        try {

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
                ];
            }
            const documentTags = await DocumentTags.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ order: 1 });

            const totalDocumentTagss = await DocumentTags.countDocuments(filters);
            const totalPages = Math.ceil(totalDocumentTagss / req.query.limit);

            res.status(200).json({
                documentTags,
                totalDocumentTagss,
                currentPage: page,
                totalPages,
                message: 'Document Tags fetched successfully'
            });
        } catch (error) {
            console.error("documentTagController:list:error -", error);
            res.status(400).json(error);
        }
    },
    async reorder(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            let documentTags = req.body.documentTags
            documentTags.forEach(async (documentTag, i) => {
                await DocumentTags.findByIdAndUpdate(documentTag, { order: i + 1 });
            });
            const page = 1;
            const limit = 10;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, organization: req.organization?._id || null };

            documentTags = await DocumentTags.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ order: 1 });

            const totalDocumentTagss = await DocumentTags.countDocuments(filters);
            const totalPages = Math.ceil(totalDocumentTagss / req.query.limit);

            res.status(200).json({
                documentTags,
                totalDocumentTagss,
                currentPage: page,
                totalPages, message: 'Employee types reordered successfully'
            });
        } catch (error) {
            console.error("\n\documentTagController:reorder:error -", error);
            res.status(400).json({ message: error.toString() });;
        }
    },
}
module.exports = documentTagController