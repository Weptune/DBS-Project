const express = require('express');
const oracledb = require('oracledb');
const router = express.Router();

const dbConfig = {
  user: 'system',
  password: 'password',
  connectString: 'localhost:1521/XE'
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM users WHERE LOWER(Email_ID) = LOWER(:email) AND Pass_word = :password`,
      [email, password],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful', token: 'dummy-token' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }

  } catch (err) {
    console.error('❌ DB Error:', err);
    res.status(500).json({ message: 'Database error', error: err.message });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

module.exports = router;
