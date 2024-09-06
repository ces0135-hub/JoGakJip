const comments = [];

exports.createComment = (req, res) => {
  const { postId } = req.params;
  const { content, password } = req.body;
  const newComment = { id: comments.length + 1, postId, content, password };
  comments.push(newComment);
  res.status(201).json(newComment);
};

exports.getComments = (req, res) => {
  const { postId } = req.params;
  const postComments = comments.filter((comment) => comment.postId === parseInt(postId));
  res.json(postComments);
};

exports.updateComment = (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const comment = comments.find((c) => c.id === parseInt(commentId));
  if (comment) {
    comment.content = content;
    res.json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
};

exports.deleteComment = (req, res) => {
  const { commentId } = req.params;
  const commentIndex = comments.findIndex((c) => c.id === parseInt(commentId));
  if (commentIndex !== -1) {
    comments.splice(commentIndex, 1);
    res.json({ message: 'Comment deleted' });
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
};
