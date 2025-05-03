const express = require("express");
const router = express.Router();
const Post = require("../models/banner");


const addPost = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const newPost = new Post({ title, description, image });
    await newPost.save();
    res.status(201).json({ message: "Post saved", post: newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPosts = async (req, res) => {
 
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
      } catch (err) {
        res.status(500).json({ error: err.message });
      } 
      
    };

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
        }
        res.json({ message: "Post deleted", post: deletedPost });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }


module.exports = { addPost ,getPosts,deletePost };

