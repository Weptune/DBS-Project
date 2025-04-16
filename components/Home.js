import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/posts/all')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

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
            <div className="mt-3 text-sm text-gray-500 flex gap-4">
              <span>👍 {post.likeCount}</span>
              <span>💬 {post.commentCount}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
