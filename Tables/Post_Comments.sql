CREATE TABLE post_comments(
  Comment_ID INT NOT NULL,
  Post_ID INT NOT NULL,
  Commented_Date DATE,
  Comment_Content VARCHAR(50),
  Commented_User_ID INT NOT NULL,
  PRIMARY KEY(Comment_ID)
);
