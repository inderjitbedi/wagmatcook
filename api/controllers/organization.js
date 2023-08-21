const User = require("../models/user");
const Organization = require("../models/organization");

const orgController = {
    async create(req, res) {
        try {
            const org = new Organization(req.body);
            org.createdBy = req.user._id;
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
