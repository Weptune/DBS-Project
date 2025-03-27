CREATE TABLE comments_like(
  Comment_ID INT NOT NULL,
  Comment_liked_User_ID INT NOT NULL,
  PRIMARY KEY (Comment_ID,Comment_liked_User_ID)
);
