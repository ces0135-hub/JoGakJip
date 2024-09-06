const posts = [];

exports.createPost = (req, res) => {
  const { groupId } = req.params;
  const { title, content, password, isPublic } = req.body;
  const newPost = { id: posts.length + 1, groupId, title, content, password, isPublic };
  posts.push(newPost);
  res.status(201).json(newPost);
};

exports.getPosts = (req, res) => {
  const { groupId } = req.params;
  const groupPosts = posts.filter((post) => post.groupId === parseInt(groupId));
  res.json(groupPosts);
};

exports.updatePost = (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  const post = posts.find((p) => p.id === parseInt(postId));
  if (post) {
    post.title = title;
    post.content = content;
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

exports.deletePost = (req, res) => {
  const { postId } = req.params;
  const postIndex = posts.findIndex((p) => p.id === parseInt(postId));
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    res.json({ message: 'Post deleted' });
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

exports.verifyPostPassword = (req, res) => {
  const { postId } = req.params;
  const { password } = req.body;
  const post = posts.find((p) => p.id === parseInt(postId));
  if (post && post.password === password) {
    res.json({ message: 'Password verified' });
  } else {
    res.status(401).json({ message: 'Invalid password' });
  }
};

exports.likePost = (req, res) => {
  const { postId } = req.params;
  const post = posts.find((p) => p.id === parseInt(postId));
  if (post) {
    if (!post.likes) {
      post.likes = 0;
    }
    post.likes++;
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

exports.checkIsPublic = (req, res) => {
  const { postId } = req.params;
  const post = posts.find((p) => p.id === parseInt(postId));
  if (post) {
    res.json({ isPublic: post.isPublic });
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};
