const File = require("../models/file");

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
            console.log("fileController:upload:file-payload-", payload);
            const file = new File({ ...payload });
            await file.save();
            res.status(201).json({ file, message: 'File uploaded successfully.' });

        } catch (error) {
            console.error("fileController:upload:error -", error);
            res.status(400).json({ message: `Unable to upload the file: ${req.file.originalname}.\n\n ${error.toString()}` });;
        }
    },
}
module.exports = fileController