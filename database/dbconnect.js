const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Library"
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(`Error connecting to database: ${error}`);
    }
};

module.exports = { dbConnection };
