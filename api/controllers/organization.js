const User = require("../models/user");
const Organization = require("../models/organization");
const path = require("path");
const fs = require("fs");
const File = require("../models/file");
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
    }, async checkNameUniqueness(req, res) {
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
}

module.exports = orgController;
