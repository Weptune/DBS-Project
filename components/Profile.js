import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios.get(`/api/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user:', error));

    axios.get(`/api/users/${userId}/posts`)
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);
  
  return (
    <div>
      <h2>{user.First_name} {user.Last_name}'s Profile</h2>
      <p>{user.Email_ID}</p>
      <h3>Your Posts</h3>
      {posts.map((post) => (
        <div key={post.Post_ID}>
          <p>{post.Post_Content}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;
