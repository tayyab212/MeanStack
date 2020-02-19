const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PostModel = require('./models/post');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://max:password212@cluster0-ihg7a.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
        console.log("connected to database")
    })
    .catch(() => {
        console.log("connection failed")
    });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PATCH,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization,Origin,X-Requested-With,Content-Type,Accept');
    next();
});

app.post('/api/posts', (req, res) => {
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content
    })
    console.log(post)
    post.save()
        .then(createdPost => {
            res.status(201).json({
                message: "New Post is addedd successfully",
                postId: createdPost._id
            })
        });

})

app.get("/api/posts", (req, res, next) => {
    PostModel.find()
        .then(document => {
            res.status(200).json({
                message: 'Message',
                posts: document
            })
        });

})


app.delete("/api/posts/:id", (req, res, next) => {
    console.log(req.params.id);
    PostModel.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({
            message: "Post deleted"
        })
    })

});

app.put('/api/posts/:id', (req, res, next) => {
    const post = new PostModel({
        _id:req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    PostModel.updateOne({ _id: req.body.id }, post) 
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: "update successfull",
                post: result
            })
        })
})


app.get("/api/posts/:id",(req,res,next)=>{
    PostModel.findById(req.params.id)
    .then(post => {
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({
                message:"not found"
            })
        }
    })
})


module.exports = app;


