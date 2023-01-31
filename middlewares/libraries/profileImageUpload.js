const multer = require('multer');
const CustomError = require('../../helpers/error/CustomError');
const path = require('path');

//File storage and filtering 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const rootDir = path.dirname(require.main.filename);
        cb(null, path.join(rootDir, "/public/uploads"));
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        req.savedProfileImage = "image_" + req.user.id + "." + extension;
        cb(null, req.savedProfileImage);
    },

});

const fileFilter = (req, file, cb) => {
    let allowedMimetypes = ["image/jpg", "image/png", "image/gif", "image/jpeg"];
    if(!allowedMimetypes.includes(file.mimetype)) {
        return cb(new CustomError("Please provide a valid image type", 400), false);
    }
    return cb(null, true);

}

const limits = {
    fieldNameSize: 30,
    fileSize: 1024 * 1024 * 4, //4 MB in bytes

}

const profileImageUpload = multer({
    storage,
    fileFilter,
    limits,

});

module.exports = {profileImageUpload, };