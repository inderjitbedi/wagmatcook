const Job = require("../models/job");
const JobApplicant = require("../models/jobApplicant");

const jobController = {
    async create(req, res) {
        try {
            req.body.createdBy = req.user._id;
            req.body.organization = req.organization?._id || null
            const job = new Job(req.body);
            await job.save();
            res.status(201).json({ job, message: 'Job created successfully.' });
        } catch (error) {
            console.error("jobController:create:error -", error);
            res.status(400).json(error);
        }
    },
    async update(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            req.body.organization = req.organization?._id || null
            const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json({ job, message: 'Job updated successfully' });
        } catch (error) {
            console.error("jobController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async delete(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            const job = await Job.findByIdAndUpdate(req.params.id, { isDeleted: true });
            res.status(200).json({ message: 'Job deleted successfully' });
        } catch (error) {
            console.error("jobController:delete:error -", error);
            res.status(400).json(error);
        }
    },
    async detail(req, res) {
        try {
            let job = await Job.findOne({ _id: req.params.id, isDeleted: false }).populate('organization');
            await job.save();
            res.status(201).json({ job, message: 'Job details fetched successfully.' });
        } catch (error) {
            console.error("jobController:detail:error -", error);
            res.status(400).json(error);
        }
    },

    async list(req, res) {
        try {

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 9999;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, organization: req.organization?._id || null };

            if (req.query.searchKey) {
                filters.$or = [
                    { title: { $regex: req.query.searchKey, $options: 'i' } },
                ];
            }
            const jobs = await Job.find(filters)
                .skip(startIndex)
                .limit(limit);

            const totalJobs = await Job.countDocuments(filters);
            const totalPages = Math.ceil(totalJobs / req.query.limit);

            res.status(200).json({
                jobs,
                totalJobs,
                currentPage: page,
                totalPages,
                message: 'Jobs fetched successfully'
            });
        } catch (error) {
            console.error("jobController:list:error -", error);
            res.status(400).json(error);
        }
    },

    async createApplicant(req, res) {
        try {
            const applicant = new JobApplicant({ job: req.params.jobid, ...req.body });
            await applicant.save();
            res.status(201).json({ applicant, message: 'Job applicant created successfully.' });
        } catch (error) {
            console.error("jobController:create:error -", error);
            res.status(400).json(error);
        }
    },
    async updateApplicant(req, res) {
        try {
            const applicant = await JobApplicant.findByIdAndUpdate(req.params.id, { job: req.params.jobid, ...req.body }, { new: true })
            res.status(200).json({ applicant, message: 'Job applicant updated successfully' });
        } catch (error) {
            console.error("jobController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async deleteApplicant(req, res) {
        try {
            req.body.updatedBy = req.user._id;
            const applicant = await JobApplicant.findByIdAndUpdate(req.params.id, { isDeleted: true });
            res.status(200).json({ message: 'Job applicant deleted successfully' });
        } catch (error) {
            console.error("jobController:delete:error -", error);
            res.status(400).json(error);
        }
    },
    async applicantDetail(req, res) {
        try {
            let applicant = await JobApplicant.findOne({ _id: req.params.id, isDeleted: false }).populate('organization');
            await applicant.save();
            res.status(201).json({ applicant, message: 'Job applicant detail fetched successfully.' });
        } catch (error) {
            console.error("jobController:detail:error -", error);
            res.status(400).json(error);
        }
    },

    async applicantList(req, res) {
        try {

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 9999;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, job: req.params?.jobid };

            if (req.query.searchKey) {
                filters.$or = [
                    { name: { $regex: req.query.searchKey, $options: 'i' } },
                ];
            }
            const applicants = await JobApplicant.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ 'selectionOrder': 1 });

            const totalApplicants = await JobApplicant.countDocuments(filters);
            const totalPages = Math.ceil(totalApplicants / req.query.limit);

            res.status(200).json({
                applicants,
                totalApplicants,
                currentPage: page,
                totalPages,
                message: 'Job applicants fetched successfully'
            });
        } catch (error) {
            console.error("jobController:list:error -", error);
            res.status(400).json(error);
        }
    },


    async applicantReorder(req, res) {
        try {
            let applicants = req.body.applicants
            applicants.forEach(async (applicant, i) => {
                await JobApplicant.findByIdAndUpdate(applicant, { selectionOrder: i + 1 });
            });
            const page = 1;
            const limit = 10;
            const startIndex = (page - 1) * limit;

            let filters = { isDeleted: false, job: req.params?.jobid };

            applicants = await JobApplicant.find(filters)
                .skip(startIndex)
                .limit(limit)
                .sort({ selectionOrder: 1 });

            const totalApplicants = await JobApplicant.countDocuments(filters);
            const totalPages = Math.ceil(totalApplicants / req.query.limit);

            res.status(200).json({
                applicants,
                totalApplicants,
                currentPage: page,
                totalPages, message: 'Job Applicants reordered successfully'
            });
        } catch (error) {
            console.error("\n\jobController:reorder:error -", error);
            res.status(400).json({ message: error.toString() });;
        }
    },
}
module.exports = jobController