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

    const formattedPosts = [];

    for (const row of result.rows) {
      const post = {
        postId: row.POST_ID,
        postedBy: row.POSTED_BY,
        date: row.POST_DATE,
        content: row.POST_CONTENT,
        likeCount: row.LIKE_COUNT,
        commentCount: row.COMMENT_COUNT,
        comments: []
      };

      const commentsRes = await connection.execute(
        `SELECT c.Comment_Content, TO_CHAR(c.Commented_Date, 'YYYY-MM-DD') AS Commented_Date, 
                u.First_Name || ' ' || u.Last_Name AS Commented_By
         FROM post_comments c
         JOIN users u ON c.Commented_User_ID = u.User_ID
         WHERE c.Post_ID = :postId
         ORDER BY c.Commented_Date DESC FETCH FIRST 3 ROWS ONLY`,
        [post.postId],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

      post.comments = commentsRes.rows.map(row => ({
        content: row.COMMENT_CONTENT,
        date: row.COMMENTED_DATE,
        user: row.COMMENTED_BY
      }));

      formattedPosts.push(post);
    }

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

    const existing = await connection.execute(
      `SELECT 1 FROM post_likes WHERE Post_ID = :postId AND Liked_User_ID = :userId`,
      [postId, userId]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Already liked' });
    }

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

// Create a new post
router.post('/create', async (req, res) => {
  const { userId, content } = req.body;
  if (!userId || !content) return res.status(400).json({ message: 'Missing data' });

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`SELECT NVL(MAX(Post_ID), 0) + 1 FROM posts`);
    const newId = result.rows[0][0];

    await connection.execute(
      `INSERT INTO posts (Post_ID, Posted_User_ID, Post_Date, Post_Content)
       VALUES (:id, :userId, SYSDATE, :content)`,
      [newId, userId, content],
      { autoCommit: true }
    );

    res.json({ message: 'Post created' });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Failed to create post', error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
