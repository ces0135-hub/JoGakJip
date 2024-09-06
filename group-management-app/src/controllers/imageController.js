const multer = require('multer');
const path = require('path');

// 이미지 저장 위치와 파일 이름 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 이미지가 저장될 폴더
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // 고유한 파일명 생성
  },
});

// multer 미들웨어 설정
const upload = multer({ storage }).single('image'); // 이미지 한 개만 업로드

// 이미지 업로드 처리 함수
exports.uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: '이미지 업로드 실패', error: err.message });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(201).json({ imageUrl });
  });
};
