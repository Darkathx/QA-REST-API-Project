const CustomError = require('../../helpers/error/CustomError');
const jwt = require("jsonwebtoken");
const {isTokenIncluded, getAccessTokenFromHeader} = require('../../helpers/authorization/tokenHelpers');
const User = require('../../models/User');
require("express-async-errors");


const getAccessToRoute = (req, res, next) => {
    if(!isTokenIncluded(req)) {
        return next(new CustomError("You are not authorized to access this route", 401));
    }

    const accessToken = getAccessTokenFromHeader(req);
    jwt.verify(accessToken, process.env.JWT_KEY, async (err, decoded) => {
        if(err) return next(new CustomError("Token is invalid", 401));
        req.user = {
            id: decoded.id,
            name: decoded.name,


        }
        next();
    });
    
};

const getAdminRights = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const role = user.role;
    if(role !== "admin") {
        return next(new CustomError("You are not authorized to access admin rights", 403));
    }
    next();
};

module.exports = {
    getAccessToRoute,
    getAdminRights,

};