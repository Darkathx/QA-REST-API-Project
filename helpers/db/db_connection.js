const mongoose = require('mongoose');

const connection = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGOOSE_CONNECT)
    .then(() => {
        console.log("DB CONNECTED SUCCESSFULLY");
    })
    .catch((err) => {
        console.error(err + "DB CONNECTION FAILED!")
    });
    
};

module.exports = connection;