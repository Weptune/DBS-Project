import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // make sure path is correct

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const userId = 1;

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

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
    <div className="home-container">
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <h1 className="heading">News Feed</h1>

      {posts.length === 0 ? (
        <p>No posts to display.</p>
      ) : (
        posts.map(post => (
          <div key={post.postId} className="post-card">
            <h2>{post.postedBy}</h2>
            <p className="date">{post.date}</p>
            <p>{post.content}</p>

            <div className="actions">
              <button onClick={() => handleLike(post.postId)}>👍</button>
              <span>{post.likeCount}</span>
              <span>💬 {post.commentCount}</span>
            </div>

            <div className="comment-input">
              <input
                type="text"
                value={commentInputs[post.postId] || ''}
                onChange={(e) => handleCommentChange(post.postId, e.target.value)}
                placeholder="Write a comment..."
              />
              <button onClick={() => handleCommentSubmit(post.postId)}>Post</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
