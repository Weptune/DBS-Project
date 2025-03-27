CREATE TABLE post_shares(
  Post_ID INT NOT NULL,
  Shared_User_ID INT NOT NULL,
  PRIMARY KEY(Post_ID,Shared_User_ID)
);
