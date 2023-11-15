const versions = require("../enum/versions");
const Document = require("../models/document");
const DocumentTags = require("../models/documentTags");
const DocumentVersion = require("../models/documentVersions");
const fileController = require("../controllers/file");
const File = require("../models/file");

const documentController = {
    async create(req, res) {
        try {
            let { title, file, version, tags, newTags, departments } = req.body
            file = await File.findOne({ _id: file });
            if (file) {
                file = await fileController.moveToUploads(req, file)
            }


            if (newTags?.length) {
                let filters = { isDeleted: false, organization: req.organization?._id || null, isDefault: { $ne: true } };
                let totalDocumentTags = await DocumentTags.countDocuments(filters);

                let newDocumentTags = await DocumentTags.insertMany(
                    newTags.map((tag) => {
                        return {
                            name: tag,
                            createdBy: req.user?._id,
                            organization: req.organization?._id,
                            order: ++totalDocumentTags
                        };
                    })
                );
                //console.log(newDocumentTags);
                newDocumentTags = newDocumentTags.map((tag) => tag._id);
                //console.log(newDocumentTags);

                //console.log("old = ", tags, "\n new=", newDocumentTags);
                tags = [...tags, ...newDocumentTags];
            }
            const documentVersion = new DocumentVersion({
                modifiedBy: req.user._id,
                file,
                version: version === versions.MAJOR ? 1 : 0.1,
            });
            await documentVersion.save();
            console.log({
                title,
                tags,
                departments,
                versions: [documentVersion._id],
                organization: req.organization?._id || null,
            });
            const document = new Document({
                title,
                tags,
                departments,
                versions: [documentVersion._id],
                organization: req.organization?._id || null,
                lastUpdatedBy: req.user._id,
            });
            await document.save();
            res
                .status(201)
                .json({ document, message: "Document created successfully." });
        } catch (error) {
            console.error("documentController:create:error -", error);
            res.status(400).json(error);
        }
    },
    async update(req, res) {
        try {
            let document = await Document.findById(req.params.id).populate({
                path: "versions",
                options: { sort: { version: -1 } },
            });

            let { title, file, version, newTags, tags, departments } = req.body;

            file = await File.findOne({ _id: file });
            if (file) {
                file = await fileController.moveToUploads(req, file);
            }

            let currentVersion = version === versions.MAJOR ? 1 : 0.1;
            if (document.versions?.length) {
                currentVersion = document.versions[0].version;
            }

            if (newTags?.length) {
                let newDocumentTags = await DocumentTags.insertMany(
                    newTags.map((tag) => {
                        return {
                            name: tag,
                            createdBy: req.user?._id,
                            organization: req.organization?._id,
                        };
                    })
                );
                newDocumentTags = newDocumentTags.map((tag) => tag._id);
                tags = [...tags, ...newDocumentTags];
            }
            const documentVersion = new DocumentVersion({
                modifiedBy: req.user._id,
                file,
                version:
                    version === versions.MAJOR
                        ? Math.floor(currentVersion) + 1
                        : currentVersion + 0.1,
            });
            await documentVersion.save();

            document = await Document.findByIdAndUpdate(
                req.params.id,
                {
                    title,
                    tags,
                    departments,
                    $push: { versions: documentVersion._id },
                    organization: req.organization?._id || null,
                    lastUpdatedBy: req.user._id,
                },
                { new: true }
            );
            res
                .status(200)
                .json({ document, message: "Document updated successfully." });
        } catch (error) {
            console.error("documentController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async delete(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            const document = await Document.findByIdAndUpdate(req.params.id, {
                isDeleted: true,
                lastUpdatedBy: req.user._id,
            });
            res.status(200).json({ message: "Document deleted successfully" });
        } catch (error) {
            console.error("documentController:delete:error -", error);
            res.status(400).json(error);
        }
    },
    async detail(req, res) {
        try {
            let filters = {
                isDeleted: false,
                _id: req.params.id,
                organization: req.organization?._id || null,
            };
            let document = await Document.findOne(filters).populate([
                { path: "tags" },
                { path: "lastUpdatedBy", populate: "personalInfo" },
                { path: "departments" },
                {
                    path: "versions",
                    options: { sort: { version: -1 } },
                    populate: [
                        { path: "file" },
                        { path: "modifiedBy", populate: "personalInfo" },
                    ],
                },
            ]);
            res.status(200).json({ document, message: "Document details fetched successfully." });
        } catch (error) {
            console.error("documentController:detail:error -", error);
            res.status(400).json(error);
        }
    },
    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 9999;
            const startIndex = (page - 1) * limit;

            let filters = {
                isDeleted: false,
                organization: req.organization?._id || null,
            };

            if (req.query.searchKey) {
                filters.$or = [
                    { title: { $regex: req.query.searchKey, $options: 'i' } },
                    { 'tags.name': { $regex: req.query.searchKey, $options: 'i' } },

                ];
            }
            const document = await Document.find(filters)
                .populate([
                    {
                        path: "tags",
                        match: {
                            $and: [
                                { isDeleted: false },
                                { name: { $regex: req.query.searchKey, $options: 'i' }, },
                            ],
                        },
                    },
                    { path: "departments" },
                    { path: "lastUpdatedBy", populate: "personalInfo" },
                    {
                        path: "versions",
                        options: {
                            sort: { version: -1 },
                        },
                        populate: [
                            { path: "file" },
                            { path: "modifiedBy", populate: "personalInfo" },
                        ],
                    },
                ])
                .skip(startIndex)
                .limit(limit)
                .sort({ createdAt: -1 });

            const totalDocuments = await Document.countDocuments(filters);
            const totalPages = Math.ceil(totalDocuments / req.query.limit);

            res.status(200).json({
                document,
                totalDocuments,
                currentPage: page,
                totalPages,
                message: "Documents fetched successfully",
            });
        } catch (error) {
            console.error("documentController:list:error -", error);
            res.status(400).json(error);
        }
    },
};
module.exports = documentController;
