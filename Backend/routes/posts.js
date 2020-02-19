const express = require('express')
const router = express.Router();
const PostModel = require('../models/post')

router.post("", (req, res) => {
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

router.get("", (req, res, next) => {
    PostModel.find()
        .then(document => {
            res.status(200).json({
                message: 'Message',
                posts: document
            })
        });

})


router.delete("/:id", (req, res, next) => {
    console.log(req.params.id);
    PostModel.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({
            message: "Post deleted"
        })
    })

});

router.put("/:id", (req, res, next) => {
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


router.get("/:id",(req,res,next)=>{
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

module.exports = router;