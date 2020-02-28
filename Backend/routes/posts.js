const express = require('express')
const router = express.Router();
const PostModel = require('../models/post')
const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
};

const mystorage = multer.diskStorage({
    destination:(req,file,cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid){
            error = null;
        }
       cb(error,"../Backend/images"); 
    },
    filename:(req,file,cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name+'-'+ Date.now() + '.'+ext);
    }
})

router.post("", multer({storage:mystorage}).single("image"),(req, res) => {
    const url = req.protocol + "//:" + req.get("host");
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content,
        imagePath: "http://localhost:3000"+ "/images/" +req.file.filename
    });
    console.log("New Post"+post)
    post.save()
        .then(createdPost => {
            res.status(201).json({
                message: "New Post is addedd successfully",
              post: {
                  ...createdPost,
                  id:createdPost._id
              }
              
            })
        });
})
router.get("", (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = PostModel.find()
    if(pageSize && currentPage) {
      postQuery
      .skip(pageSize * currentPage)
      .limit(pageSize);
    }
    postQuery.find()
        .then(document => {
           PostModel.count();
        }).then(count => {
            res.send(200).json({
                message:"posts fetched successfully",
                post:document
            })
        });
})

router.delete("/:id", (req, res, next) => {
    PostModel.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({
            message: "Post deleted"
        })
    })

});

router.put("/:id",multer({storage:mystorage}).single("image") ,(req, res, next) => {
    var ImagePath= req.body.image;
    if(req.file){
        const url = req.protocol + "//:" + req.get("host");
        ImagePath= "http://localhost:3000"+ "/images/" +req.file.filename
    }
    const post = new PostModel({
        _id:req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath:ImagePath
    });
    console.log("Updated Post :" +post);
    PostModel.updateOne({ _id: req.body.id }, post) 
        .then((result) => {
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