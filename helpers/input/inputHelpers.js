const bcrypt = require('bcrypt');
const validateUserInput = (email, password) => {
    return email && password;
};

const comparePasswords = (password, hashedpw) => {
    return bcrypt.compareSync(password, hashedpw);
};

module.exports = {
    validateUserInput,
    comparePasswords,
    
};