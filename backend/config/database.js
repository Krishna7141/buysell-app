const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => {console.log("Database Connection: SUCCESS")})
    .catch((err) => {
        console.log("Database Connection: ERROR");
        console.error(err);
        process.exit(1);
    });
}