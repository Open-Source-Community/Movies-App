require("dotenv").config()
dbPassword = process.env.MONGO_URI

module.exports = {
    mongoURI: dbPassword
};
