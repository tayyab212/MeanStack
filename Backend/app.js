const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const postRoutes = require('../Backend/routes/posts')
const mongoose = require('mongoose');
const path = require('path')


mongoose.connect("mongodb+srv://max:password212@cluster0-ihg7a.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
        console.log("connected to database")
    })
    .catch(() => {
        console.log("connection failed")
    });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//app.use("/images",express.static('/src/assets/images'));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PATCH,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization,Origin,X-Requested-With,Content-Type,Accept');
    next();
});

app.use("/api/posts",postRoutes);

module.exports = app;


