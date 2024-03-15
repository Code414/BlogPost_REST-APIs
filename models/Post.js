const mongoose = require('mongoose');

//creating schema
const postSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
  });

  //creating model
  const Post = mongoose.model('Post', postSchema);

  module.exports = Post;