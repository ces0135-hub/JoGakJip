const groups = []; // 메모리 기반 데이터베이스 예시 (실제 DB로 대체 필요)

exports.createGroup = (req, res) => {
  const { name, description, password, isPublic } = req.body;
  const newGroup = { id: groups.length + 1, name, description, password, isPublic };
  groups.push(newGroup);
  res.status(201).json(newGroup);
};

exports.getGroups = (req, res) => {
  res.json(groups);
};

exports.updateGroup = (req, res) => {
  const { groupId } = req.params;
  const { name, description } = req.body;
  const group = groups.find((g) => g.id === parseInt(groupId));
  if (group) {
    group.name = name;
    group.description = description;
    res.json(group);
  } else {
    res.status(404).json({ message: 'Group not found' });
  }
};

exports.deleteGroup = (req, res) => {
  const { groupId } = req.params;
  const groupIndex = groups.findIndex((g) => g.id === parseInt(groupId));
  if (groupIndex !== -1) {
    groups.splice(groupIndex, 1);
    res.json({ message: 'Group deleted' });
  } else {
    res.status(404).json({ message: 'Group not found' });
  }
};

exports.verifyPassword = (req, res) => {
  const { groupId } = req.params;
  const { password } = req.body;
  const group = groups.find((g) => g.id === parseInt(groupId));
  if (group && group.password === password) {
    res.json({ message: 'Password verified' });
  } else {
    res.status(401).json({ message: 'Invalid password' });
  }
};

exports.likeGroup = (req, res) => {
  const { groupId } = req.params;
  const group = groups.find((g) => g.id === parseInt(groupId));
  if (group) {
    if (!group.likes) {
      group.likes = 0;
    }
    group.likes++;
    res.json(group);
  } else {
    res.status(404).json({ message: 'Group not found' });
  }
};

exports.checkIsPublic = (req, res) => {
  const { groupId } = req.params;
  const group = groups.find((g) => g.id === parseInt(groupId));
  if (group) {
    res.json({ isPublic: group.isPublic });
  } else {
    res.status(404).json({ message: 'Group not found' });
  }
};
