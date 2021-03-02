const express = require("express");
const router = express.Router();
const Post = require('../models/Post');

//Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (e) {
        res.json({ message: e });
    }
});

//Submit a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (e) {
        res.json({ message: e });
    }
});

//Get a specific post
router.get('/:id', async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.id);
        res.json(foundPost);
    } catch (e) {
        res.json({ message: e });
    }
});

//Delete a specific post
router.delete('/:id', async (req, res) => {
    try {
        const removedPost = await Post.remove({_id: req.params.id});
        res.json(removedPost);
    } catch (e) {
        res.json({ message: e });
    }
});

//Update a specific post
router.patch('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id: req.params.id}, 
            { $set: {title: req.body.title} 
        });
        res.json(updatedPost);
    } catch (e) {
        res.json({ message: e });
    }
});

module.exports = router;