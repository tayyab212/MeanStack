const jwt = require('jsonwebtoken')

module.exports = (req, res, next ) => {
    try {
        jwt.verify(token,"secret_this_should_be_longer");
        next();
    } catch (error) {
        res.status(401).json({ message: "auth failed" })
    }
    const token = req.headers.authorization.split(" ")[1];
}