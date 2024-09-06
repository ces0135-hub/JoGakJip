const express = require('express');
const { getBadges, awardBadge } = require('../controllers/badgeController');
const router = express.Router();

// 배지 조회 API 엔드포인트
router.get('/:userId/badges', getBadges);

// 특정 조건에서 배지 부여 API 엔드포인트
router.post('/:userId/badges', awardBadge);

module.exports = router;
