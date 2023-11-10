const multer = require("multer");
const constants = require("../enum/fileConfig");
const fs = require("fs-extra");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let path = `temp`;
    fs.mkdirsSync(path);
    callback(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname.replaceAll(" ", "_"));
  },
  // limits: (req, file, cb) => {

  //     const fileConfig = constants[req.params.type.toUpperCase() + '_CONFIG'];
  //
  //     cb(null, { fileSize: fileConfig.MAX_SIZE })
  // },
});

// Define a function to determine the file size limit dynamically
const getFileSizeLimit = (req) => {
  const fileConfig = constants[req.params.type.toUpperCase() + "_CONFIG"]; //console.log(fileConfig.MAX_SIZE);
  return fileConfig.MAX_SIZE; // Set your desired file size limit in bytes here
};
const uploadFile = multer({
  storage: storage,
  limits: getFileSizeLimit,
  fileFilter: (req, file, cb) => {
    const fileConfig = constants[req.params.type.toUpperCase() + "_CONFIG"];
    if (!fileConfig) {
      return cb(new Error(`Unsupported file type!`));
    } else {
      const filetypes = fileConfig.ALLOWED_EXTENSIONS_REGEX;
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      // const mimetype = filetypes.test(file.mimetype);
      if (extname) {
        //mimetype &&
        return cb(null, true);
      } else {
        return cb(
          new Error(`File must be of type ${fileConfig.ALLOWED_EXTENSIONS}!`)
        );
      }
    }
  },
});
module.exports = uploadFile;
