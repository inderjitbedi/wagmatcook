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
const EmployeeType = require("../models/employeeType");
const EmployeeReviews = require("../models/employeeReviews");
const EmployeeDisciplinaries = require("../models/employeeDisciplinaries");
const EmployeeLeaveAllocation = require("../models/employeeLeaveAllocation");


const employeeController = {


    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 9999;
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
                        'userOrganizations.organization': req.organization?._id || null,
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
                    $lookup: {
                        from: 'files',
                        localField: 'personalInfo.photo',
                        foreignField: '_id',
                        as: 'photoInfo',
                    },
                },
                {
                    $addFields: {
                        'personalInfo.photo': { $arrayElemAt: ['$photoInfo', 0] },
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

            const user = new User({ email: req.body.email });
            // const token = crypto.randomBytes(20).toString('hex');
            // user.invitationToken = token;
            // user.invitationTokenExpiry = Date.now() + (3600000 * 24);
            await user.save();

            const relation = new UserOrganization({ user: user._id, organization: req.organization?._id || null });
            await relation.save()


            const { firstName, lastName } = req.body

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

            let emailExists = await User.findOne({ email: req.body.workEmail, _id: { $ne: req.params.id } })
            if (emailExists) {
                return res.status(400).json({ message: 'Duplicate employee work email' });
            }

            let file = await File.findOne({ _id: req.body.photo });
            if (file) {
                req.body.photo = await fileController.moveToUploads(req, file)
            }

            const personalInfo = await EmployeePersonalInfo.findOneAndUpdate({ employee: req.params.id }, req.body, { new: true })

            user.email = req.body.workEmail;
            user.save();

            res.status(200).json({
                personalInfo,
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
            const jobDetails = await EmployeeJobDetails.findOne({ employee: req.params.id }).populate('department employee employeeType')

            res.status(200).json({
                personalInfo,
                jobDetails,
                message: 'Employee personal info fetched successfully'
            });

        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },

    async getReportsToList(req, res) {
        try {
            if (req.organization._id) {
                let users = await UserOrganization.aggregate([
                    {
                        $match: { organization: req.organization._id },
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'user',
                            foreignField: '_id',
                            as: 'userData',
                        },
                    },
                    {
                        $unwind: '$userData',
                    },
                    {
                        $lookup: {
                            from: 'employeepersonalinfos',
                            localField: 'user',
                            foreignField: 'employee',
                            as: 'personalInfo',
                        },
                    },
                    {
                        $match: {
                            'userData.role': { $ne: roles.EMPLOYEE },
                        },
                    },
                ])



                // let users = await UserOrganization.find({ organization: req.organization._id })
                //     .populate('user')
                // let filteredUsers = []
                // for (const user of users) {
                //     if (user.role != "EMPLOYEE") {
                //         filteredUsers.push(user)
                //     }
                // }
                res.status(200).json({
                    users,
                    message: 'Reports to list fetched successfully'
                });
            } else

                res.status(200).json({
                    users: [],
                    message: 'Reports to list fetched successfully'
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
            // req.body.details.employee = req.params.id
            // const details = await EmployeeJobDetails.findOneAndUpdate({ employee: req.params.id }, req.body.details, { upsert: true, new: true })



            let positions = req.body.positions;
            let isActive = req.body.isActive

            const primaryPositions = positions.filter(position => position.isPrimary === true);

            if (primaryPositions.length) {
                if (primaryPositions.length > 1) {
                    return res.status(400).json({ message: 'Primary position can\'t be more than one' });
                }
            } else {
                return res.status(400).json({ message: 'Atleast one primary position required' });
            }


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

            await User.findByIdAndUpdate(req.params.id, { role: primaryPositions[0].role, isActive });

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

            // const details = await EmployeeJobDetails.findOne({ employee: req.params.id }).populate('department employee employeeType')

            const positions = await EmployeePositionHistory.find({ employee: req.params.id, isDeleted: false }).populate('department employee employeeType').sort({ 'startDate': -1 })

            const personalInfo = await EmployeePersonalInfo.findOne({ employee: req.params.id }).populate('photo employee')

            res.status(200).json({
                // details,
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
            if (req.body.isPrimary) {
                await EmployeePositionHistory.updateMany({ employee: req.params.id }, { isPrimary: false });

            }

            const position = new EmployeePositionHistory({ ...req.body, employee: req.params.id });
            await position.save();

            if (req.body.isPrimary) {
                await User.findByIdAndUpdate(req.params.id, { role: req.body.role });
            }

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

            const benefit = await EmployeeBenefits.findOneAndUpdate({ employee: req.params.id }, req.body, { new: true, upsert: true })

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

            const benefit = await EmployeeBenefits.findOne({ employee: req.params.id }).populate('employee benefit')
            const personalInfo = await EmployeePersonalInfo.findOne({ employee: req.params.id }).populate('photo')
            const jobDetails = await EmployeeJobDetails.findOne({ employee: req.params.id }).populate('department employee employeeType')

            res.status(200).json({
                benefit, personalInfo, jobDetails,
                message: 'Employee benefit fetched successfully'
            });

        } catch (error) {
            console.error("employeeController:getBenefit:error -", error);
            res.status(400).json(error);
        }
    },

    async addCertificate(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            const certificate = new EmployeeCertificates({ ...req.body, employee: req.params.id });
            await certificate.save();

            res.status(200).json({
                certificate,
                message: 'Employee certificate added successfully'
            });
        } catch (error) {
            console.error("employeeController:update:error -", error);
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

            for (const certificate of certificates) {
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
            };

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
            const certificates = await EmployeeCertificates.find({ employee: req.params.id, isDeleted: false }).populate('file employee').sort({ completionDate: -1 })

            const personalInfo = await EmployeePersonalInfo.findOne({ employee: req.params.id }).populate('photo')
            const jobDetails = await EmployeeJobDetails.findOne({ employee: req.params.id }).populate('department employee employeeType')

            res.status(200).json({
                certificates, personalInfo, jobDetails,
                message: 'Employee certificates fetched successfully'
            });

        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },

    async getReviews(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }
            const reviews = await EmployeeReviews.find({ employee: req.params.id, isDeleted: false }).populate('file employee completedBy')

            const personalInfo = await EmployeePersonalInfo.findOne({ employee: req.params.id }).populate('photo')
            const jobDetails = await EmployeeJobDetails.findOne({ employee: req.params.id }).populate('department employee employeeType')

            res.status(200).json({
                reviews, personalInfo, jobDetails,
                message: 'Employee reviews fetched successfully'
            });

        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async addReview(req, res) {
        try {

            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            let file = await File.findOne({ _id: req.body.file });
            if (file) {
                req.body.file = await fileController.moveToUploads(req, file)
            }
            const review = new EmployeeReviews({ ...req.body, employee: req.params.id, completedBy: req.user._id });
            await review.save();

            res.status(200).json({
                review,
                message: 'Employee review added successfully'
            });

        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },

    async updateReview(req, res) {
        try {

            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            let file = await File.findOne({ _id: req.body.file });
            if (file) {
                req.body.file = await fileController.moveToUploads(req, file)
            }



            const review = await EmployeeReviews.findOneAndUpdate({ _id: req.params.reviewid }, { ...req.body, employee: req.params.id, completedBy: req.user._id });
            await review.save();

            res.status(200).json({
                review,
                message: 'Employee review added successfully'
            });

        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },

    async getDisciplinaries(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }
            const disciplinaries = await EmployeeDisciplinaries.find({ employee: req.params.id, isDeleted: false }).populate('file employee disciplinary')

            const personalInfo = await EmployeePersonalInfo.findOne({ employee: req.params.id }).populate('photo')
            const jobDetails = await EmployeeJobDetails.findOne({ employee: req.params.id }).populate('department employee employeeType')

            res.status(200).json({
                disciplinaries, personalInfo, jobDetails,
                message: 'Employee disciplinaries fetched successfully'
            });

        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async addDisciplinary(req, res) {
        try {

            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            let file = await File.findOne({ _id: req.body.file });
            if (file) {
                req.body.file = await fileController.moveToUploads(req, file)
            }
            const disciplinary = new EmployeeDisciplinaries({ ...req.body, employee: req.params.id, completedBy: req.user._id });
            await disciplinary.save();

            res.status(200).json({
                disciplinary,
                message: 'Employee disciplinary added successfully'
            });

        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async addType(req, res) {
        try {
            const employeeType = new EmployeeType({ ...req.body, organization: req.organization?._id || null })
            await employeeType.save()
            res.status(200).json({
                employeeType,
                message: 'Employee type added successfully'
            });
        } catch (error) {
            console.error("employeeController:updateBenefit:error -", error);
            res.status(400).json(error);
        }
    },
    async updateType(req, res) {
        try {
            const employeeType = await EmployeeType.findOneAndUpdate({ _id: req.params.id }, { ...req.body, organization: req.organization?._id || null })
            res.status(200).json({
                employeeType,
                message: 'Employee type updated successfully'
            });
        } catch (error) {
            console.error("employeeController:updateBenefit:error -", error);
            res.status(400).json(error);
        }
    },
    async getTypes(req, res) {
        try {
            const types = await EmployeeType.find({ organization: req.organization?._id || null, isDeleted: false })

            res.status(200).json({
                types,
                message: 'Employee types fetched successfully'
            });

        } catch (error) {
            console.error("employeeController:getBenefit:error -", error);
            res.status(400).json(error);
        }
    },


    async addDocument(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            const document = new EmployeeDocuments({ ...req.body, employee: req.params.id });
            await document.save();

            res.status(200).json({
                document,
                message: 'Employee document added successfully'
            });
        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async deleteDocument(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            let document = await EmployeeDocuments.findOneAndUpdate({ _id: req.params.documentid }, { isDeleted: true }, { new: true });
            res.status(200).json({
                document,
                message: 'Employee document deleted successfully'
            });
        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async getDocuments(req, res) {
        try {
            const documents = await EmployeeDocuments.find({ employee: req.params.id, isDeleted: false })
            res.status(200).json({
                documents,
                message: 'Employee documents fetched successfully'
            });
        } catch (error) {
            console.error("employeeController:getBenefit:error -", error);
            res.status(400).json(error);
        }
    },


    async addLeaveAllocation(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            const allocation = new EmployeeLeaveAllocation({ ...req.body, employee: req.params.id });
            await allocation.save();

            res.status(200).json({
                allocation,
                message: 'Employee leave allocation added successfully'
            });
        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async deleteLeaveAllocation(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            let allocation = await EmployeeLeaveAllocation.findOneAndUpdate({ _id: req.params.allocationid }, { isDeleted: true }, { new: true });
            res.status(200).json({
                allocation,
                message: 'Employee leave allocation deleted successfully'
            });
        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async updateLeaveAllocation(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) {
                return res.status(400).json({ message: 'Employee doesn\'t exists' });
            }

            let allocation = await EmployeeLeaveAllocation.findOneAndUpdate({ _id: req.params.allocationid }, { ...req.body }, { new: true });
            res.status(200).json({
                allocation,
                message: 'Employee leave allocation updated successfully'
            });
        } catch (error) {
            console.error("employeeController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async getLeaveAllocations(req, res) {
        try {
            const allocations = await EmployeeLeaveAllocation.find({ employee: req.params.id, isDeleted: false })
            res.status(200).json({
                allocations,
                message: 'Employee allocations fetched successfully'
            });
        } catch (error) {
            console.error("employeeController:getBenefit:error -", error);
            res.status(400).json(error);
        }
    },



}

module.exports = employeeController;
