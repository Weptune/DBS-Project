import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  // Replace this with your logged-in user ID
  const userId = 1;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get('http://localhost:3001/api/posts/all')
      .then(res => setPosts(res.data))
      .catch(err => console.error('Error fetching posts:', err));
  };

  const handleLike = (postId) => {
    axios.post('http://localhost:3001/api/posts/like', { postId, userId })
      .then(() => fetchPosts())
      .catch(err => console.error('Error liking post:', err));
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs(prev => ({ ...prev, [postId]: value }));
  };

  const handleCommentSubmit = (postId) => {
    const content = commentInputs[postId];
    if (!content) return;

    axios.post('http://localhost:3001/api/posts/comment', { postId, userId, content })
      .then(() => {
        fetchPosts();
        setCommentInputs(prev => ({ ...prev, [postId]: '' }));
      })
      .catch(err => console.error('Error adding comment:', err));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">News Feed</h1>
      {posts.length === 0 ? (
        <p>No posts to display.</p>
      ) : (
        posts.map(post => (
          <div key={post.postId} className="bg-white p-4 rounded-xl shadow mb-6">
            <h2 className="font-semibold text-lg">{post.postedBy}</h2>
            <p className="text-gray-600">{post.date}</p>
            <p className="mt-2 text-gray-800">{post.content}</p>
            <div className="mt-3 text-sm text-gray-500 flex gap-4 items-center">
              <button onClick={() => handleLike(post.postId)}>👍</button>
              <span>{post.likeCount}</span>
              <span>💬 {post.commentCount}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={commentInputs[post.postId] || ''}
                onChange={(e) => handleCommentChange(post.postId, e.target.value)}
                placeholder="Write a comment..."
                className="border p-1 rounded w-full"
              />
              <button
                onClick={() => handleCommentSubmit(post.postId)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Post
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
