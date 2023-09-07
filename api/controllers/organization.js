const User = require("../models/user");
const Organization = require("../models/organization");
const path = require("path");
const fs = require("fs");
const File = require("../models/file");
const roles = require("../enum/roles");
const sendGrid = require('../providers/sendGrid.js');
const UserOrganization = require("../models/userOrganization");
const crypto = require('crypto');


// Function to create a directory if it doesn't exist
const createDirectoryIfNotExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

const orgController = {
    async create(req, res) {
        try {
            const org = new Organization(req.body);
            console.log(req.user);
            let file = await File.findOne({ _id: req.body.file });
            const tempFilePath = [file.destination, file.name].join('/')
            const newFilePath = "uploads/";
            const newFileName = Date.now() + "_" + req.user._id + "_" + file.originalName.replaceAll(' ', '_')
            const destFilePath = newFilePath + newFileName

            createDirectoryIfNotExists(path.join(__dirname, '../', newFilePath));

            await fs.renameSync(path.join(__dirname, "../" + tempFilePath),
                path.join(__dirname, "../" + destFilePath));
            console.log("Saved File:", {
                ...file.toObject(),
                destination: newFilePath,
                path: destFilePath,
                name: newFileName
            });
            file = await File.findOneAndUpdate({ _id: req.body.file }, {
                ...file.toObject(),
                destination: newFilePath,
                path: destFilePath,
                name: newFileName
            }, { new: true });

            org.createdBy = req.user._id;
            org.logo = file._id
            await org.save();
            res.status(201).json({ organization: org, message: 'Organization created successfully.' });
        } catch (error) {
            console.error("authController:register:error -", error);
            res.status(400).json(error);
        }
    },
    async checkNameUniqueness(req, res) {
        try {
            const { name } = req.params;
            // Check if user already exists
            const existingOrg = await Organization.findOne({ name });
            // if (existingUser) {
            //     return res.status(409).json({ isUnique: !existingUser, message: 'User already exists' });
            // }
            res.json({ isUnique: !existingOrg });
        } catch (error) {
            console.error("authController:checkEmailUniqueness:error -", error);
            res.status(400).json({ message: error.toString() });;
        }
    },
    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, isActive: true };

            if (req.query.searchKey) {
                filters.$or = [
                    { name: { $regex: req.query.searchKey, $options: 'i' } },
                    // { description: { $regex: req.query.searchKey, $options: 'i' } }
                ];
            }
            const organizations = await Organization.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ createdAt: -1 });

            const totalOrganizations = await Organization.countDocuments(filters);
            const totalPages = Math.ceil(totalOrganizations / req.query.limit);

            res.status(200).json({
                organizations,
                totalOrganizations,
                currentPage: page,
                totalPages,
                message: 'Organizations fetched successfully'
            });
        } catch (error) {
            console.error("organizationController:list:error -", error);
            res.status(400).json(error);
        }
    },
    async initiate(req, res) {
        try {
            const org = new Organization({
                name: req.body.name
                // , createdBy: req.user._id
            });
            await org.save();

            const user = new User({ email: req.body.email, role: roles.ORG_ADMIN });
            const token = crypto.randomBytes(20).toString('hex');
            user.invitationToken = token;
            user.invitationTokenExpiry = Date.now() + (3600000 * 24);
            await user.save();

            const relation = new UserOrganization({ user: user._id, organization: org._id, isPrimary: true });
            await relation.save()


            sendGrid.send(user.email, 'invite', { org, user });
            res.status(200).json({
                message: 'Invitation sent successfully'
            });

        } catch (error) {
            console.error("organizationController:list:error -", error);
            res.status(400).json(error);
        }
    }
}

module.exports = orgController;
