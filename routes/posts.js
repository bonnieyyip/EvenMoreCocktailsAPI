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
        strDrink: req.body.strDrink,
        strInstructions: req.body.strInstructions
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
        const removedPost = await Post.remove({idDrink: req.params.id});
        res.json(removedPost);
    } catch (e) {
        res.json({ message: e });
    }
});

//Update a specific post
router.patch('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            {idDrink: req.params.id}, 
            { $set: {strDrink: req.body.strDrink} 
        });
        res.json(updatedPost);
    } catch (e) {
        res.json({ message: e });
    }
});

module.exports = router;