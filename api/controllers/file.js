const File = require("../models/file");

const path = require("path");
const fs = require("fs");

const fileController = {
    async upload(req, res) {
        try {
            if (req.file == undefined) {
                return res.status(400).send({ message: "File is required" });
            }

            let uploadedFile = req.file
            const payload = {
                name: uploadedFile.filename,
                originalName: uploadedFile.originalname,
                path: uploadedFile.path,
                destination: uploadedFile.destination,
                mimeType: uploadedFile.mimetype,
                size: uploadedFile.size,
                uploadedBy: req.user._id
            }
            //console.log("fileController:upload:file-payload-", payload);
            const file = new File({ ...payload });
            await file.save();
            res.status(201).json({ file, message: 'File uploaded successfully.' });

        } catch (error) {
            console.error("fileController:upload:error -", error);
            res.status(400).json({ message: `Unable to upload the file: ${req.file.originalname}.\n\n ${error.toString()}` });;
        }
    },

    async moveToUploads(req, file) {
        try {

            if (!file) {
                return null;
            }
            //console.log("Moving file .. ");
            const tempFilePath = [file.destination, file.name].join('/');
            const newFilePath = 'uploads/';
            const newFileName = Date.now() + '_' + req.user._id + '_' + file.originalName.replaceAll(' ', '_');
            const destFilePath = newFilePath + newFileName;

            createDirectoryIfNotExists(path.join(__dirname, '../', newFilePath));

            await fs.renameSync(
                path.join(__dirname, '../' + tempFilePath),
                path.join(__dirname, '../' + destFilePath)
            );

            // //console.log('Saved File:', {
            //     ...file.toObject(),
            //     destination: newFilePath,
            //     path: destFilePath,
            //     name: newFileName,
            // });

            const updatedFile = await File.findOneAndUpdate(
                { _id: file._id },
                {
                    ...file.toObject(),
                    destination: newFilePath,
                    path: destFilePath,
                    name: newFileName,
                },
                { new: true }
            );

            return updatedFile._id;

        } catch (error) {
            return file._id;
        }
    }

}

const createDirectoryIfNotExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

module.exports = fileController