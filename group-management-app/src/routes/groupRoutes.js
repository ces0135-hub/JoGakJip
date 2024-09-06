const express = require('express');
const { createGroup, getGroups, updateGroup, deleteGroup, verifyPassword, likeGroup, checkIsPublic } = require('../controllers/groupController');
const router = express.Router();

// 그룹 API 엔드포인트
router.post('/', createGroup);
router.get('/', getGroups);
router.put('/:groupId', updateGroup);
router.delete('/:groupId', deleteGroup);
router.post('/:groupId/verify-password', verifyPassword);
router.post('/:groupId/like', likeGroup);
router.get('/:groupId/is-public', checkIsPublic);

module.exports = router;