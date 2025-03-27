CREATE TABLE page_likes(
  Page_ID INT NOT NULL,
  Page_User_ID INT NOT NULL,
  PRIMARY KEY(Page_ID,Page_User_ID)
);
