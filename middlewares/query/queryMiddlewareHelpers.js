const searchHelper = (searchKey, query, req) => {
    if(!searchKey) return query;

    const searchObject = {};
    const regex = new RegExp(req.query.search, "i");
    searchObject[searchKey] = regex;
    return query = query.where(searchObject);
};

const populateHelper = (query, population) => {
    return query.populate(population);
};

const questionSortHelper = (query, req) => {
    const sortKey = req.query.sortBy;
    if(sortKey === "most-answered") {
        return query = query.sort("-answerCount");
    }
    else if(sortKey === "most-liked") {
        return query = query.sort("-likeCount");
    }
    return query = query.sort("-createdAt");
};

const paginationHelper = async (totalDocuments, query, req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    const total = totalDocuments;

    if(startIndex > 0) {
        pagination.previous = {
            page: page - 1,
            limit,

        };
    }
    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,

        };
    }
    if(query !== undefined) {
        query = query.skip(startIndex).limit(limit);
    }
    return {
        query,
        pagination,
        startIndex,
        limit,
        
    };
};

const userSortHelper = () => {
    const sortKey = req.query.sortBy;
};

module.exports = {searchHelper, populateHelper, questionSortHelper, paginationHelper, userSortHelper, };