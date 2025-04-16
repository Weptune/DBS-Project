const express = require('express');
const oracledb = require('oracledb');
const router = express.Router();

const dbConfig = {
  user: 'system',
  password: 'password',
  connectString: 'localhost:1521/XE'
};

// Fetch all posts
router.get('/all', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(`
      SELECT p.Post_ID, u.First_Name || ' ' || u.Last_Name AS Posted_By, 
             TO_CHAR(p.Post_Date, 'YYYY-MM-DD') AS Post_Date, 
             p.Post_Content,
             (SELECT COUNT(*) FROM post_likes l WHERE l.Post_ID = p.Post_ID) AS Like_Count,
             (SELECT COUNT(*) FROM post_comments c WHERE c.Post_ID = p.Post_ID) AS Comment_Count
      FROM posts p
      JOIN users u ON p.Posted_User_ID = u.User_ID
      ORDER BY p.Post_Date DESC
    `, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });

    const formattedPosts = result.rows.map(row => ({
      postId: row.POST_ID,
      postedBy: row.POSTED_BY,
      date: row.POST_DATE,
      content: row.POST_CONTENT,
      likeCount: row.LIKE_COUNT,
      commentCount: row.COMMENT_COUNT
    }));

    res.json(formattedPosts);

  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Failed to fetch posts', error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// Like a post
router.post('/like', async (req, res) => {
  const { postId, userId } = req.body;
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `INSERT INTO post_likes (Post_ID, Liked_User_ID) VALUES (:postId, :userId)`,
      [postId, userId],
      { autoCommit: true }
    );
    res.json({ message: 'Post liked successfully' });
  } catch (err) {
    console.error('Error liking post:', err);
    res.status(500).json({ message: 'Failed to like post', error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// Comment on a post
router.post('/comment', async (req, res) => {
  const { postId, userId, content } = req.body;
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT NVL(MAX(Comment_ID), 0) + 1 AS NewID FROM post_comments`
    );

    const newCommentId = result.rows[0][0];

    await connection.execute(
      `INSERT INTO post_comments (Comment_ID, Post_ID, Commented_Date, Comment_Content, Commented_User_ID)
       VALUES (:id, :postId, SYSDATE, :content, :userId)`,
      [newCommentId, postId, content, userId],
      { autoCommit: true }
    );

    res.json({ message: 'Comment added successfully' });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Failed to add comment', error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
