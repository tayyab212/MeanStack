const express = require('express')
const router = express.Router()
const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

router.post("/signup", (req, res, next) => {
    console.log("singup")
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "User created",
                        result: result
                    })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            })
                        })
                })
        })
});

router.post("/login", (req, res, next) => {
    console.log("login")
    let fetchedUser;
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth Failed"
                })
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            const token = jwt.sign({ 
                email: fetchedUser.email, userId: fetchedUser._id },
                 'secret_this_should_be_longer', 
                 { expiresIn: "1h" }
                 );
               res.status(200).json({
                token: token,
                expiresIn:3600,
                userId: fetchedUser._id
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth Failed"
            })
        })
});
module.exports = router