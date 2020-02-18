const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PostModel = require('./models/post')
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://max:password212@cluster0-ihg7a.mongodb.net/test?retryWrites=true&w=majority")
.then(()=>{
    console.log("connected to database")
})
.catch(()=>{
    console.log("connection failed")
});

// const post  = [ {
//     id:"123",
//     title:'title',
//     content:"this is content"
// },
// {
//     id:"123",
//     title:'title',
//     content:"this is content"
// }, 
// ]

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))



app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type, Authorization,Origin,X-Requested-With,Content-Type,Accept');
    next();
  });

  app.post('/api/posts',(req,res)=>{
      const post =new PostModel({
          title:req.body.title,
          content :req.body.content
      })
      console.log(post)
      post.save();
      res.status(201).json({
          message:"New Post is addedd successfully"
      })
  })

app.get("/api/posts",(req,res,next)=>{
    PostModel.find()
    .then(document => {
        res.status(200).json({
            message :'Message',
            posts: document
        })
    });

})


app.delete("/api/posts/:id",(req,res,next)=>{
console.log(req.params.id);
PostModel.deleteOne({_id:req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({
        message: "Post deleted"
    }) 
})

});



module.exports = app;

  
