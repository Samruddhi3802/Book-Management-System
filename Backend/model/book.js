const mongoose = require("mongoose");

const bookSchema=new mongoose.Schema({
    bookTitle:{
        type:String,
        required:true
    },
    bookAuthor:{
        type:String,
        required:true
    },
    publishDate:{
        type:Date,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Description:{
        type:String,
        required:false
    }
}, {timestamps:true})

const book= mongoose.model("Book", bookSchema);
module.exports =book
