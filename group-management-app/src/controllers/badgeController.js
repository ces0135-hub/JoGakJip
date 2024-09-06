const badges = []; // 사용자별 배지 데이터 저장소 (예시)
const posts = [];  // 게시글 데이터 (기존에 구현된 컨트롤러에서 사용하는 데이터와 동일하게 사용)
const groups = []; // 그룹 데이터 (기존에 구현된 컨트롤러에서 사용하는 데이터와 동일하게 사용)

// 배지 조회 함수
exports.getBadges = (req, res) => {
  const { userId } = req.params;
  const userBadges = badges.filter((badge) => badge.userId === parseInt(userId));
  res.json(userBadges);
};

// 배지 부여 함수
exports.awardBadge = (req, res) => {
  const { userId } = req.params;
  const userGroups = groups.filter(group => group.userId === parseInt(userId));
  const userPosts = posts.filter(post => post.userId === parseInt(userId));
  
  // 새로운 배지 조건 (예시 조건에 따라 배지 부여)
  const newBadges = [];

  // 조건 1: 7일 연속 활동
  if (userGroups.length >= 1) {
    newBadges.push({ userId: parseInt(userId), badgeName: '7일 연속 활동' });
  }

  // 조건 2: 20개 이상의 추억(게시글) 등록
  if (userPosts.length >= 20) {
    newBadges.push({ userId: parseInt(userId), badgeName: '추억 20개 이상 등록' });
  }

  // 조건 3: 그룹 생성
  if (userGroups.length >= 1) {
    newBadges.push({ userId: parseInt(userId), badgeName: '그룹 생성' });
  }

  // 조건 4: 추억 1만개 이상 조회
  const totalViews = userPosts.reduce((acc, post) => acc + (post.views || 0), 0);
  if (totalViews >= 10000) {
    newBadges.push({ userId: parseInt(userId), badgeName: '추억 1만 이상 조회' });
  }

  // 새로운 배지를 기존 배지 목록에 추가
  newBadges.forEach(badge => {
    const existingBadge = badges.find(b => b.userId === badge.userId && b.badgeName === badge.badgeName);
    if (!existingBadge) {
      badges.push(badge);
    }
  });

  res.status(201).json(newBadges);
};
