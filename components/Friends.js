import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Friends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios.get('/api/friends')
      .then(response => {
        setFriends(response.data);
      })
      .catch(error => {
        console.log('Error fetching friends:', error);
      });
  }, []);

  return (
    <div>
      <h2>Your Friends</h2>
      {friends.map((friend) => (
        <div key={friend.User_ID}>
          <p>{friend.First_name} {friend.Last_name}</p>
        </div>
      ))}
    </div>
  );
}

export default Friends;
