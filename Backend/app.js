const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PostModel = require('./models/post')
const post  = [ {
    id:"123",
    title:'title',
    content:"this is content"
},
{
    id:"123",
    title:'title',
    content:"this is content"
}, 
]

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
      res.status(201).json({
          message:"New Post is addedd successfully"
      })
  })

app.use("/api/posts",(req,res,next)=>{
res.status(200).json({
    message :'Message',
    posts: post
})
})

module.exports = app;

  
