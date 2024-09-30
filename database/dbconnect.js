const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Library",
            useNewUrlParser: true,       // Sử dụng parser mới của Mongoose
            useUnifiedTopology: true      // Đảm bảo kết nối ổn định
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(`Error connecting to database: ${error}`);
    }
};

module.exports = { dbConnection };
