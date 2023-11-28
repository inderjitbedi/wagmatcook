const Job = require("../models/job");
const JobApplicant = require("../models/jobApplicant");
const fileController = require("../controllers/file");
const File = require("../models/file");
const pdfTemplate = require("../utils/pdfTemplate");
const pdfGenerator = require("../utils/pdfGenerator");
const path = require("path");
const fs = require("fs");
const jobController = {
  async create(req, res) {
    try {
      req.body.createdBy = req.user._id;
      req.body.organization = req.organization?._id || null;
      const job = new Job(req.body);
      let file = await File.findOne({ _id: req.body.file });
      if (file) {
        req.body.file = await fileController.moveToUploads(req, file);
      }
      await job.save();
      res.status(201).json({ job, message: "Job created successfully." });
    } catch (error) {
      console.error("jobController:create:error -", error);
      res.status(400).json(error);
    }
  },
  async update(req, res) {
    try {
      req.body.updatedBy = req.user._id;
      req.body.organization = req.organization?._id || null;
      let file = await File.findOne({ _id: req.body.file });
      if (file) {
        req.body.file = await fileController.moveToUploads(req, file);
      }
      const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({ job, message: "Job updated successfully" });
    } catch (error) {
      console.error("jobController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async delete(req, res) {
    try {
      req.body.updatedBy = req.user._id;
      const job = await Job.findByIdAndUpdate(req.params.id, {
        isDeleted: true,
      });
      res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
      console.error("jobController:delete:error -", error);
      res.status(400).json(error);
    }
  },
  async markInactive(req, res) {
    try {
      let job = await Job.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { isCompleted: !!req.body.isCompleted },
        { new: true }
      )
        .populate("department")
        .populate("file");

      res.status(200).json({
        job,
        message:
          "job marked as " +
          (req.body.isCompleted ? "active" : "inactive") +
          " successfully",
      });
    } catch (error) {
      console.error("taskController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async detail(req, res) {
    try {
      let job = await Job.findOne({
        _id: req.params.id,
        isDeleted: false,
      }).populate("organization department file");
      await job.save();
      res
        .status(201)
        .json({ job, message: "Job details fetched successfully." });
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

      let filters = {
        isDeleted: false,
        organization: req.organization?._id || null,
      };

      if (req.query.searchKey) {
        filters.$or = [
          { title: { $regex: req.query.searchKey, $options: "i" } },
        ];
      }
      let sortBy = req.query.sortBy || "createdAt";
      let sortOrder = parseInt(req.query.sortOrder);
      if (sortOrder === 0 || !sortOrder) {
        sortBy = "createdAt";
        sortOrder = -1;
      }
      // let activeSortField = "";
      let sortOptions = {};
      if (sortBy && sortOrder) {
        sortOptions[sortBy] = sortOrder;
      }
      console.log("this is my sort option", sortOptions);
       if (req.query.sort) {
         filters.isCompleted = req.query.sort === "true";
       }
      const jobs = await Job.aggregate([
        {
          $match: filters,
        },
        {
          $lookup: {
            from: "departments",
            localField: "department",
            foreignField: "_id",
            as: "department",
          },
        },
        {
          $unwind: "$department",
        },
        {
          $lookup: {
            from: "files",
            localField: "file",
            foreignField: "_id",
            as: "file",
          },
        },
        {
          $unwind: {
            path: "$file",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $sort: sortOptions,
        },
        {
          $skip: startIndex,
        },
        {
          $limit: limit,
        },
      ]);

      const totalJobs = await Job.countDocuments(filters);
      const totalPages = Math.ceil(totalJobs / req.query.limit);

      res.status(200).json({
        jobs,
        totalJobs,
        currentPage: page,
        totalPages,
        message: "Jobs fetched successfully",
        sortBy,
        sortOrder,
      });
    } catch (error) {
      console.error("jobController:list:error -", error);
      res.status(400).json(error);
    }
  },
  async generatePdf(req, res) {
    try {
      const jobId = req.params.id;
      let filters = { isDeleted: false, job: req.params?.id };
      const jobDetails = await Job.findOne({
        _id: jobId,
        isDeleted: false,
      }).populate("organization department file");
      // console.log("Job Details:", jobDetails);
      const applicants = await JobApplicant.find(filters)
        .populate("documents")
        .sort({ selectionOrder: 1 });

      const htmlTemplate = await pdfTemplate.jobApplicants(
        jobDetails,
        applicants
      );
      // console.log("this is my template", htmlTemplate);
      const pdfOutputPath = path.join(__dirname, `job_${jobId}_report.pdf`);
      await pdfGenerator(htmlTemplate, pdfOutputPath, `<p></p>`);

      // Send the generated PDF as a response
      res.status(200).sendFile(pdfOutputPath, () => {
        // Remove the generated PDF file after sending
        //  fs.unlinkSync(pdfOutputPath);
      });
    } catch (error) {
      console.error("jobController:list:error -", error);
      res.status(400).json(error);
    }
  },

  async createApplicant(req, res) {
    try {
      const applicant = new JobApplicant({
        job: req.params.jobid,
        ...req.body,
      });
      await applicant.save();
      const job = await Job.findById(req.params.jobid);
      if (job) {
        job.applicants.push(applicant._id);
        await job.save();
      }
      res
        .status(201)
        .json({ applicant, message: "Job applicant created successfully." });
    } catch (error) {
      console.error("jobController:create:error -", error);
      res.status(400).json(error);
    }
  },
  async updateApplicant(req, res) {
    try {
      const applicant = await JobApplicant.findByIdAndUpdate(
        req.params.id,
        { job: req.params.jobid, ...req.body },
        { new: true }
      );
      res
        .status(200)
        .json({ applicant, message: "Job applicant updated successfully" });
    } catch (error) {
      console.error("jobController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async deleteApplicant(req, res) {
    try {
      const { id } = req.params;
      req.body.updatedBy = req.user._id;

      // the applicant and the associated job
      const applicant = await JobApplicant.findById(id);
      const job = await Job.findById(applicant.job);

      // If both the applicant and the associated job exist
      if (applicant && job) {
        // Remove the applicant from the job's applicants array
        job.applicants.pull(id);
        await job.save();
      }

      // Set isDeleted to true for the applicant
      await JobApplicant.findByIdAndUpdate(id, { isDeleted: true });

      res.status(200).json({ message: "Job applicant deleted successfully" });
    } catch (error) {
      console.error("jobController:delete:error -", error);
      res.status(400).json(error);
    }
  },
  async applicantDetail(req, res) {
    try {
      let applicant = await JobApplicant.findOne({
        _id: req.params.id,
        isDeleted: false,
      }).populate("documents");
      await applicant.save();
      res.status(201).json({
        applicant,
        message: "Job applicant detail fetched successfully.",
      });
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
          { name: { $regex: req.query.searchKey, $options: "i" } },
        ];
      }
      const applicants = await JobApplicant.find(filters)
        .populate("documents")
        .skip(startIndex)
        .limit(limit)
        .sort({ selectionOrder: 1 });

      const totalApplicants = await JobApplicant.countDocuments(filters);
      const totalPages = Math.ceil(totalApplicants / req.query.limit);

      res.status(200).json({
        applicants,
        totalApplicants,
        currentPage: page,
        totalPages,
        message: "Job applicants fetched successfully",
      });
    } catch (error) {
      console.error("jobController:list:error -", error);
      res.status(400).json(error);
    }
  },

  async applicantReorder(req, res) {
    try {
      let applicants = req.body.applicants;
      applicants.forEach(async (applicant, i) => {
        await JobApplicant.findByIdAndUpdate(applicant, {
          selectionOrder: i + 1,
        });
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
        totalPages,
        message: "Job Applicants reordered successfully",
      });
    } catch (error) {
      console.error("\njobController:reorder:error -", error);
      res.status(400).json({ message: error.toString() });
    }
  },
};
module.exports = jobController;
