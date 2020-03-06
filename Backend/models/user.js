const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const usreSchema = mongoose.Schema({
     email : {type:String,required:true,unique:true},
     password : {type:String,required:true}
})

usreSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User",usreSchema);