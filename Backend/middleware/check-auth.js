const jwt = require('jsonwebtoken')

 module.exports = (req, res, next ) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization;
        console.log(token);
     const decodedToken = jwt.verify(token,"secret_this_should_be_longer");
     req.userData = {email:decodedToken.email,userId:decodedToken.userId};
    next();
    } catch (error) {
        res.status(401).json({ message: "auth failed" })
    }
}