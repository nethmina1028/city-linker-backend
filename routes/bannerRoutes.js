

const express = require("express");
const {  addPost ,getPosts,deletePost} = require("../controllers/bannerController");

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.delete("/:id",deletePost)


module.exports = router;
