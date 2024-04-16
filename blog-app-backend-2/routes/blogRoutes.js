const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/blogController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, createPost);
router.get('/', auth, getAllPosts);
router.get('/:id', auth, getPostById);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
