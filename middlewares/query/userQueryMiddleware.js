require("express-async-errors");
const {searchHelper, paginationHelper, } = require("./queryMiddlewareHelpers");

const userQueryMiddleware = function(model, options) {
    return async (req, res, next) => {
        let query = model.find();
        query = searchHelper("name", query, req);
        const total = await model.countDocuments();
        const paginationResult = await paginationHelper(total, query, req);
        query = paginationResult.query;
        const pagination = paginationResult.pagination;
        const queryResults = await query.find();
        res.query = {
            success: true,
            count: queryResults.length,
            pagination,
            data: queryResults,

        };

        next();
    };
};


module.exports = {userQueryMiddleware};