const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Library"
    })
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch(error => {
            console.log(`Error connecting to database: ${error}`);
        });
};

module.exports = { dbConnection };
