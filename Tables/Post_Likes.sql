CREATE TABLE post_likes(
  Post_ID INT NOT NULL,
  Liked_User_ID INT NOT NULL,
  PRIMARY KEY(Post_ID,Liked_User_ID)
);
