const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// 라우터 임포트 (경로 수정)
const groupRoutes = require('./src/routes/groupRoutes');
const postRoutes = require('./src/routes/postRoutes');
const commentRoutes = require('./src/routes/commentRoutes');
const imageRoutes = require('./src/routes/imageRoutes');

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 이미지 저장 경로 설정
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API 라우트 설정
app.use('/api/groups', groupRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/image', imageRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('서버가 실행 중입니다.');
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
