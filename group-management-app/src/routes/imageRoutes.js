const express = require('express');
const { uploadImage } = require('../controllers/imageController');
const router = express.Router();

// 이미지 업로드 엔드포인트
router.post('/', uploadImage);

module.exports = router;
