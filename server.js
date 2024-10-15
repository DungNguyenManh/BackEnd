// server.js
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app'); // import ứng dụng Express từ file app.js

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Example app listening at http://localhost:${PORT}`);
// });