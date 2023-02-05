require("express-async-errors");
const {populateHelper, paginationHelper, } = require("./queryMiddlewareHelpers");

const answerQueryMiddleware = function (model, options) {
    return async (req, res, next) => {
    const id = req.params.id;
    const arrayName = "answers";
    const total = (await model.findById(id))["answerCount"];
    const paginationResult = await paginationHelper(total, undefined, req);
    const startIndex = paginationResult.startIndex;
    const limit = paginationResult.limit;
    let queryObject = {};
    queryObject[arrayName] = {$slice : [startIndex, limit]}; 
    let query = model.find({_id: id}, queryObject);
    query = populateHelper(query, options.population);
    const queryResult = await query;
    res.queryResult = {
        success: true,
        pagination: paginationResult.pagination,
        data: queryResult,

    }
    next();
    }
};

module.exports = answerQueryMiddleware;