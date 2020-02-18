const express = require('express');
const app = express();

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

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type, Authorization,Origin,X-Requested-With,Content-Type,Accept');
    next();
  });

app.use("/api/posts",(req,res,next)=>{
res.status(200).json({
    message :'Message',
    posts: post
})
})

module.exports = app;

  
