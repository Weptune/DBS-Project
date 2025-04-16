const express = require('express');
const oracledb = require('oracledb');
const router = express.Router();

const dbConfig = {
  user: 'system',
  password: 'password',
  connectString: 'localhost:1521/XE'
};

router.get('/all', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(`
      SELECT p.Post_ID, u.Name AS Posted_By, TO_CHAR(p.Post_Date, 'YYYY-MM-DD') AS Post_Date,
             p.Post_Content,
             (SELECT COUNT(*) FROM likes l WHERE l.Post_ID = p.Post_ID) AS Like_Count,
             (SELECT COUNT(*) FROM comments c WHERE c.Post_ID = p.Post_ID) AS Comment_Count
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
    if (connection) {
      await connection.close();
    }
  }
});

module.exports = router;
