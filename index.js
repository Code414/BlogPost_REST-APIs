const express = require('express');
const app = express();
const db = require('./config/db');
const Post = require('./models/Post');

const port = 3000;

//to parse the data to body 
app.use(express.json());

db().then(()=> console.log('Database connected successfully')).catch(err => console.log(err));

//to check the health of API
app.get('/api/', (req, res) => {
    //res.send('API is working fine')
    //to like json format
    res.status(200).json({message : 'API is working fine'})
})

//fetching all posts
app.get('/api/posts', (req, res) => {
    Post.find({}).then((data) => {
        //console.log(data)
        res.status(200).json({data : data})
    }).catch((error) => {
        //console.log(error)
        res.status(500).json({message : error})
    })
})

//to get a specific post
app.get('/api/posts/:id', (req, res) => {
    let postId = req.params.id;
    Post.find({_id : postId}).then((data) => {
        res.status(200).json({data : data})
    }).catch((error) => {
        res.status(500).json({message : error})
    })
})

//create a new post 
app.post('/api/posts', (req, res) => {
    let newPost = new Post ({
        title : req.body.title,
        description : req.body.description
    })

    //console.log(newPost)

    newPost.save().then((data) => {
        res.status(200).json({message: "Post created successfully", data: data})
    }).catch((error) => {
        res.status(500).json({message : error})
    })
})

//updating a specific post
app.put('/api/posts/:id', (req, res) => {
    let postId = req.params.id;

    let newInfo = {
        title : "Updated Title of Post",
        description : "Updated Description"
    }
    Post.findByIdAndUpdate(postId, newInfo).then((data) => {
        res.status(200).json({message: "Post updated successfully"})
    }).catch((error) => {
        res.status(500).json({message : error})
    })
})

//deleting a specific post
app.delete('/api/posts/:id', (req, res) => {
    let postId = req.params.id;

    Post.findByIdAndDelete(postId).then((data) => {
        res.status(200).json({message: "Post deleted successfully"})
    }).catch((error) => {
        res.status(500).json({message : error})
    })
})

app.listen(port, (err) => {
    if(!err){
        console.log(`Server is up and running at ${port}`);
    }
});