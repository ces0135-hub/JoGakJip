const express = require('express');
const { createComment, getComments, updateComment, deleteComment } = require('../controllers/commentController');
const router = express.Router();

// 댓글 API 엔드포인트
router.post('/posts/:postId/comments', createComment);
router.get('/posts/:postId/comments', getComments);
router.put('/comments/:commentId', updateComment);
router.delete('/comments/:commentId', deleteComment);

module.exports = router;
