const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt"); // Only if needed, otherwise remove

// CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json("Post not found.");
        }

        if (post.username === req.body.username) {
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            return res.status(200).json(updatedPost);
        } else {
            return res.status(401).json("You can update only your post!");
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json("Post not found.");
        }

        if (post.username === req.body.username) {
            await Post.findByIdAndDelete(req.params.id);
            return res.status(200).json("Post has been deleted.");
        } else {
            return res.status(401).json("You can delete only your post!");
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json("Post not found.");
        }
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;

    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({ categories: { $in: [catName] } });
        } else {
            posts = await Post.find();
        }

        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
