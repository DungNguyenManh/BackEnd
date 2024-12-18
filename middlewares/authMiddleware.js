const jwt = require('jsonwebtoken');

// Middleware xác thực token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ 
                status: 403,
                message: "Access denied", 
                data: [] 
            });
        }
        next();
    };
}

module.exports = { authenticateToken, authorizeRole };
