const roles = require("../enum/roles");
const EmployeePersonalInfo = require("../models/employeePersonalInfo");
const User = require("../models/user");
const UserOrganization = require("../models/userOrganization");

const File = require("../models/file");
const EmployeeJobDetails = require("../models/employeeJobDetails");
const EmployeePositionHistory = require("../models/employeePositionHistory");
const fileController = require('../controllers/file');
const EmployeeBenefits = require("../models/employeeBenefits");
const EmployeeCertificates = require("../models/employeeCertificates");


const employeeController = {


    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, role: roles.EMPLOYEE }

            const employees = await User.aggregate([
                {
                    $match: filters,
                },
                {
                    $lookup: {
                        from: 'userorganizations',
                        localField: '_id',
                        foreignField: 'user',
                        as: 'userOrganizations',
                    },
                },
                {
                    $match: {
                        'userOrganizations.organization': req.organization._id,
                    },
                },
                {
                    $lookup: {
                        from: 'employeepersonalinfos',
                        localField: '_id',
                        foreignField: 'employee',
                        as: 'personalInfo',
                    },
                },

                {
                    $lookup: {
                        from: 'employeejobdetails',
                        localField: '_id',
                        foreignField: 'employee',
                        as: 'jobDetails',
                    },
                },

                {
                    $skip: startIndex,
                },
                {
                    $limit: limit,
                }

            ]);

            const totalEmployees = await User.countDocuments(filters);
            const totalPages = Math.ceil(totalEmployees / req.query.limit);
            res.status(200).json({
                employees,
                totalEmployees,
                currentPage: page,
                totalPages,
                message: 'Employees fetched successfully'
            });
        } catch (error) {
            console.error("employeeController:list:error -", error);
            res.status(400).json(error);
        }
    },


    async add(req, res) {
        try {

            const userExists = await User.findOne({ email: req.body.email })
            if (userExists) {
                return res.status(400).json({ message: 'User email already registered' });
            }

            const user = new User({ email: req.body.email, role: roles.EMPLOYEE });
            // const token = crypto.randomBytes(20).toString('hex');
            // user.invitationToken = token;
            // user.invitationTokenExpiry = Date.now() + (3600000 * 24);
            await user.save();

            const relation = new UserOrganization({ user: user._id, organization: req.organization._id });
            await relation.save()


            const { firstName, lastName } = req.body
            console.log(req.body, firstName, lastName);
            const personalInfo = new EmployeePersonalInfo({ employee: user._id, firstName, lastName });
            await personalInfo.save()

            res.status(200).json({
                employee: user,
                message: 'Employee added successfully'
            });

        } catch (error) {
            console.error("employeeController:add:error -", error);
            res.status(400).json(error);
        }
    },


    async delete(req, res) {
        try {
            let user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            user = await User.findOneAndUpdate({ _id: req.params.id }, { isDeleted: true })
            res.status(200).json({
                message: 'Employee deleted successfully'
            });

        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },

    async updatePersonalInfo(req, res) {
        try {

            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            let file = await File.findOne({ _id: req.body.photo });
            if (file) {
                req.body.photo = await fileController.moveToUploads(req, file)
                console.log(req.body.photo);
            }
            const personalInfo = await EmployeePersonalInfo.findOneAndUpdate({ employee: req.params.id }, req.body, { new: true })
            const jobDetails = await EmployeeJobDetails.findOne({ employee: req.params.id }).populate('department employee')

            res.status(200).json({
                personalInfo,
                jobDetails,
                message: 'Employee personal info updated successfully'
            });

        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async getPersonalInfo(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            const personalInfo = await EmployeePersonalInfo.findOne({ employee: req.params.id }).populate('photo employee')

            res.status(200).json({
                personalInfo,
                message: 'Employee personal info fetched successfully'
            });

        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },




    async updateJobDetails(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }
            // req.body.details.reportsTo = req.user._id
            req.body.details.employee = req.params.id
            const details = await EmployeeJobDetails.findOneAndUpdate({ employee: req.params.id }, req.body.details, { upsert: true, new: true })
            let positions = req.body.positions
            let updatedPositions = []
            for (const position of positions) {
                if (position._id) {
                    const existingPosition = await EmployeePositionHistory.findByIdAndUpdate(position._id, { $set: { ...position, employee: req.params.id } }, { new: true });
                    updatedPositions.push(existingPosition)
                } else {
                    const newPosition = new EmployeePositionHistory({ ...position, employee: req.params.id });
                    await newPosition.save();
                    updatedPositions.push(newPosition)
                }
            }
            const existingPositionIds = updatedPositions.map((code) => code._id);
            await EmployeePositionHistory.updateMany({ _id: { $nin: existingPositionIds } }, { isDeleted: true }, { new: true });

            res.status(200).json({
                details,
                positions: updatedPositions,
                message: 'Employee job details updated successfully'
            });

        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },

    async getJobDetails(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            const details = await EmployeeJobDetails.findOne({ employee: req.params.id }).populate('department employee')
            const positions = await EmployeePositionHistory.find({ employee: req.params.id, isDeleted: false }).populate('department')


            const personalInfo = await EmployeePersonalInfo.findOne({ employee: req.params.id }).populate('photo employee')

            res.status(200).json({
                details,
                positions,
                personalInfo,
                message: 'Employee job details fetched successfully'
            });

        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async addPosition(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            const position = new EmployeePositionHistory({ ...req.body, employee: req.params.id });
            await position.save();

            res.status(200).json({
                position,
                message: 'Employee position added successfully'
            });
        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },

    async updateBenefit(req, res) {
        try {

            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            const benefit = await EmployeeBenefits.findOneAndUpdate({ employee: req.params.id }, req.body, { new: true })


            res.status(200).json({
                benefit,
                message: 'Employee benefit updated successfully'
            });

        } catch (error) {
            console.error("employeeController:updateBenefit:error -", error);
            res.status(400).json(error);
        }
    },
    async getBenefit(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            const benefit = await EmployeeBenefits.findOne({ employee: req.params.id }).populate('employee')

            res.status(200).json({
                benefit,
                message: 'Employee benefit fetched successfully'
            });

        } catch (error) {
            console.error("employeeController:getBenefit:error -", error);
            res.status(400).json(error);
        }
    },


    async updateCertificates(req, res) {
        try {

            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            let { certificates } = req.body
            let updatedCertificates = []

            await certificates.forEach(async certificate => {
                let file = await File.findOne({ _id: certificate.file });
                if (file) {
                    certificate.file = await fileController.moveToUploads(req, file)
                }
                if (certificate._id) {
                    const existingCertificate = await EmployeeCertificates.findByIdAndUpdate(certificate._id, { $set: { ...certificate, employee: req.params.id } }, { new: true });
                    updatedCertificates.push(existingCertificate)
                } else {
                    const newCertificate = new EmployeeCertificates({ ...certificate, employee: req.params.id });
                    await newCertificate.save();
                    updatedCertificates.push(newCertificate)
                }
            });


            const existingCertificateIds = updatedCertificates.map((code) => code._id);
            await EmployeeCertificates.updateMany({ _id: { $nin: existingCertificateIds } }, { isDeleted: true }, { new: true });


            res.status(200).json({
                message: 'Employee certificates updated successfully'
            });

        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async getCertificates(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }
            const certificates = await EmployeeCertificates.find({ employee: req.params.id, isDeleted: false }).populate('file employee')
            res.status(200).json({
                certificates,
                message: 'Employee certificates fetched successfully'
            });

        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },



}

module.exports = employeeController;
