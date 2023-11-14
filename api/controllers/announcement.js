const Announcement = require("../models/announcement");

const announcementController = {
    async create(req, res) {
        try {
            req.body.createdBy = req.user._id;
            req.body.organization = req.organization?._id || null
            const announcement = new Announcement(req.body);
            await announcement.save();

            res.status(201).json({ announcement, message: 'Announcement created successfully.' });
        } catch (error) {
            console.error("announcementController:create:error -", error);
            res.status(400).json(error);
        }
    },
    // async update(req, res) {
    //     try {
    //         req.body.updatedBy = req.user._id;
    //         req.body.organization = req.organization?._id || null
    //         const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true })
    //         res.status(200).json({ announcement, message: 'Announcement updated successfully' });
    //     } catch (error) {
    //         console.error("announcementController:update:error -", error);
    //         res.status(400).json(error);
    //     }
    // },
    async delete(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            const announcement = await Announcement.findByIdAndUpdate(req.params.id, { isDeleted: true });
            res.status(200).json({ message: 'Announcement deleted successfully' });
        } catch (error) {
            console.error("announcementController:delete:error -", error);
            res.status(400).json(error);
        }
    },
    async detail(req, res) {
        try {
            let announcement = await Announcement.findOne({ _id: req.params.id, isDeleted: false }).populate('organization departments attachment');
            await announcement.save();
            res.status(201).json({ announcement, message: 'Announcement details fetched successfully.' });
        } catch (error) {
            console.error("announcementController:detail:error -", error);
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

            let filters = { isDeleted: false, organization: req.organization?._id || null };

            if (req.query.searchKey) {
                filters.$or = [
                    { title: { $regex: req.query.searchKey, $options: 'i' } },
                    { description: { $regex: req.query.searchKey, $options: 'i' } }
                ];
            }
            const announcements = await Announcement.find(filters).populate('organization departments attachment')
                .skip(startIndex)
                .limit(limit)
                .sort({ createdAt: -1 });

            const totalAnnouncements = await Announcement.countDocuments(filters);
            const totalPages = Math.ceil(totalAnnouncements / req.query.limit);

            res.status(200).json({
                announcements,
                totalAnnouncements,
                currentPage: page,
                totalPages,
                message: 'Announcements fetched successfully'
            });
        } catch (error) {
            console.error("announcementController:list:error -", error);
            res.status(400).json(error);
        }
    },
    async dashboardList(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 4;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, organization: req.organization?._id || null };

            const announcements = await Announcement.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ createdAt: -1 });

            const totalAnnouncements = await Announcement.countDocuments(filters);
            const totalPages = Math.ceil(totalAnnouncements / req.query.limit);

            res.status(200).json({
                announcements,
                totalAnnouncements,
                currentPage: page,
                totalPages,
                message: 'Announcements fetched successfully'
            });
        } catch (error) {
            console.error("announcementController:list:error -", error);
            res.status(400).json(error);
        }
    },
}
module.exports = announcementController