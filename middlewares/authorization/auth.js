const CustomError = require('../../helpers/error/CustomError');
const jwt = require("jsonwebtoken");
const {isTokenIncluded} = require('../../helpers/authorization/tokenHelpers');



const getAccessToRoute = (req, res, next) => {
    if(!isTokenIncluded(req)) {
        return next(new CustomError("You are not authorized to access this route", 401));
    }
    next();
};

module.exports = {
    getAccessToRoute,

};