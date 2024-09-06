const express = require('express');
const { createPost, getPosts, updatePost, deletePost, verifyPostPassword, likePost, checkIsPublic } = require('../controllers/postController');
const router = express.Router();

// 게시글 API 엔드포인트
router.post('/groups/:groupId/posts', createPost);
router.get('/groups/:groupId/posts', getPosts);
router.put('/posts/:postId', updatePost);
router.delete('/posts/:postId', deletePost);
router.post('/posts/:postId/verify-password', verifyPostPassword);
router.post('/posts/:postId/like', likePost);
router.get('/posts/:postId/is-public', checkIsPublic);

module.exports = router;
