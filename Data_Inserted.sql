INSERT INTO users (USER_ID, EMAIL_ID, PHONE_NO, PASS_WORD, FIRST_NAME, LAST_NAME, CITY, PINCODE, DOB, GENDER)
VALUES (1, 'john.doe@email.com', '9876543210', 'pass1234', 'John', 'Doe', 'New York', 10001, DATE '1990-05-15', 'Male');

INSERT INTO users (USER_ID, EMAIL_ID, PHONE_NO, PASS_WORD, FIRST_NAME, LAST_NAME, CITY, PINCODE, DOB, GENDER)
VALUES (2, 'jane.smith@email.com', '8765432109', 'securePwd', 'Jane', 'Smith', 'Los Angeles', 90001, DATE '1988-08-20', 'Female');

INSERT INTO users (USER_ID, EMAIL_ID, PHONE_NO, PASS_WORD, FIRST_NAME, LAST_NAME, CITY, PINCODE, DOB, GENDER)
VALUES (3, 'alice.jones@email.com', '7654321098', 'alice123', 'Alice', 'Jones', 'Chicago', 60601, DATE '1995-12-10', 'Female');

INSERT INTO users (USER_ID, EMAIL_ID, PHONE_NO, PASS_WORD, FIRST_NAME, LAST_NAME, CITY, PINCODE, DOB, GENDER)
VALUES (4, 'bob.brown@email.com', '6543210987', 'bobSecure', 'Bob', 'Brown', 'Houston', 77001, DATE '1992-03-25', 'Male');

INSERT INTO users (USER_ID, EMAIL_ID, PHONE_NO, PASS_WORD, FIRST_NAME, LAST_NAME, CITY, PINCODE, DOB, GENDER)
VALUES (5, 'charlie.davis@email.com', '5432109876', 'charlieD!', 'Charlie', 'Davis', 'San Francisco', 94101, DATE '1993-07-18', 'Male');

INSERT INTO users (USER_ID, EMAIL_ID, PHONE_NO, PASS_WORD, FIRST_NAME, LAST_NAME, CITY, PINCODE, DOB, GENDER)
VALUES (6, 'david.wilson@email.com', '4321098765', 'davidPass', 'David', 'Wilson', 'Seattle', 98101, DATE '1991-01-30', 'Male');

INSERT INTO users (USER_ID, EMAIL_ID, PHONE_NO, PASS_WORD, FIRST_NAME, LAST_NAME, CITY, PINCODE, DOB, GENDER)
VALUES (7, 'emily.taylor@email.com', '3210987654', 'emily@456', 'Emily', 'Taylor', 'Boston', 02101, DATE '1996-09-22', 'Female');

INSERT INTO users (USER_ID, EMAIL_ID, PHONE_NO, PASS_WORD, FIRST_NAME, LAST_NAME, CITY, PINCODE, DOB, GENDER)
VALUES (8, 'frank.miller@email.com', '2109876543', 'frank$pass', 'Frank', 'Miller', 'Denver', 80201, DATE '1987-11-05', 'Male');

INSERT INTO users (USER_ID, EMAIL_ID, PHONE_NO, PASS_WORD, FIRST_NAME, LAST_NAME, CITY, PINCODE, DOB, GENDER)
VALUES (9, 'grace.martin@email.com', '1098765432', 'grace*secure', 'Grace', 'Martin', 'Austin', 73301, DATE '1994-04-12', 'Female');

INSERT INTO users (USER_ID, EMAIL_ID, PHONE_NO, PASS_WORD, FIRST_NAME, LAST_NAME, CITY, PINCODE, DOB, GENDER)
VALUES (10, 'henry.thomas@email.com', '0987654321', 'henry123!', 'Henry', 'Thomas', 'Phoenix', 85001, DATE '1989-06-28', 'Male');



insert into friends values(1,2);
insert into friends values(1,3);
insert into friends values(1,4);
insert into friends values(2,3);
insert into friends values(5,3);
insert into friends values(4,3);
insert into friends values(1,5);



INSERT INTO pages (PAGE_ID, PAGE_NAME, PAGE_CONTENT) VALUES (1, 'Profile', 'View and edit your profile information.');
INSERT INTO pages (PAGE_ID, PAGE_NAME, PAGE_CONTENT) VALUES (2, 'News Feed', 'See the latest posts from your friends.');
INSERT INTO pages (PAGE_ID, PAGE_NAME, PAGE_CONTENT) VALUES (3, 'Messages', 'Chat with your friends privately.');
INSERT INTO pages (PAGE_ID, PAGE_NAME, PAGE_CONTENT) VALUES (4, 'Friends', 'Manage your friends and connections.');
INSERT INTO pages (PAGE_ID, PAGE_NAME, PAGE_CONTENT) VALUES (5, 'Notifications', 'Get updates about your activity.');
INSERT INTO pages (PAGE_ID, PAGE_NAME, PAGE_CONTENT) VALUES (6, 'Groups', 'Join and interact with communities.');
INSERT INTO pages (PAGE_ID, PAGE_NAME, PAGE_CONTENT) VALUES (7, 'Events', 'Find and attend social media events.');
INSERT INTO pages (PAGE_ID, PAGE_NAME, PAGE_CONTENT) VALUES (8, 'Marketplace', 'Buy and sell items with others.');
INSERT INTO pages (PAGE_ID, PAGE_NAME, PAGE_CONTENT) VALUES (9, 'Settings', 'Adjust your account preferences.');
INSERT INTO pages (PAGE_ID, PAGE_NAME, PAGE_CONTENT) VALUES (10, 'Help Center', 'Find support and FAQs.');




insert into page_likes values(1,1);
insert into page_likes values(3,1);
insert into page_likes values(4,2);
insert into page_likes values(5,4);
insert into page_likes values(7,2);
insert into page_likes values(3,3);
insert into page_likes values(2,1);
insert into page_likes values(1,5);
select * from page_likes;



INSERT INTO post_comments (Comment_ID, Post_ID, Commented_Date, Comment_Content, Commented_User_ID) VALUES 
(1, 1, DATE '2024-03-20', 'Welcome to the platform!', 2);

INSERT INTO post_comments (Comment_ID, Post_ID, Commented_Date, Comment_Content, Commented_User_ID) VALUES 
(2, 2, DATE '2024-03-21', 'That sounds like a great day!', 3);

INSERT INTO post_comments (Comment_ID, Post_ID, Commented_Date, Comment_Content, Commented_User_ID) VALUES 
(3, 3, DATE '2024-03-22', 'Good luck with your new job!', 4);

INSERT INTO post_comments (Comment_ID, Post_ID, Commented_Date, Comment_Content, Commented_User_ID) VALUES 
(4, 4, DATE '2024-03-23', 'Happy Birthday to your friend! 🎉', 5);

INSERT INTO post_comments (Comment_ID, Post_ID, Commented_Date, Comment_Content, Commented_User_ID) VALUES 
(5, 5, DATE '2024-03-24', 'Great job on finishing the project!', 6);

INSERT INTO post_comments (Comment_ID, Post_ID, Commented_Date, Comment_Content, Commented_User_ID) VALUES 
(6, 6, DATE '2024-03-25', 'Sunsets are always magical! 🌅', 7);

INSERT INTO post_comments (Comment_ID, Post_ID, Commented_Date, Comment_Content, Commented_User_ID) VALUES 
(7, 7, DATE '2024-03-26', 'Name it Lucky! 🐶', 8);

INSERT INTO post_comments (Comment_ID, Post_ID, Commented_Date, Comment_Content, Commented_User_ID) VALUES 
(8, 8, DATE '2024-03-27', 'That place looks amazing!', 9);

INSERT INTO post_comments (Comment_ID, Post_ID, Commented_Date, Comment_Content, Commented_User_ID) VALUES 
(9, 9, DATE '2024-03-28', 'Which programming language are you learning?', 10);

INSERT INTO post_comments (Comment_ID, Post_ID, Commented_Date, Comment_Content, Commented_User_ID) VALUES 
(10, 10, DATE '2024-03-29', 'I recommend reading "The Alchemist"!', 1);




insert into posts(Posted_User_ID,Post_Date,Post_Content) values(2,DATE '2020-09-19','first image');
insert into posts(Posted_User_ID,Post_Date,Post_Content) values(3,DATE '2019-08-20','second image');
insert into posts(Posted_User_ID,Post_Date,Post_Content) values(4,DATE '2018-07-21','fourth image');
insert into posts(Posted_User_ID,Post_Date,Post_Content) values(5,DATE '2017-06-22','fifth image');
insert into posts(Posted_User_ID,Post_Date,Post_Content) values(1,DATE '2016-05-23','sixth image');
insert into posts(Posted_User_ID,Post_Date,Post_Content) values(2,DATE '2015-04-24','seventh image');
insert into posts(Posted_User_ID,Post_Date,Post_Content) values(3,DATE '2014-03-25','eighth image');
insert into posts(Posted_User_ID,Post_Date,Post_Content) values(4,DATE '2013-02-26','nineth image');





insert into post_likes values(1,2);
insert into post_likes values(2,5);
insert into post_likes values(3,1);
insert into post_likes values(4,3);
insert into post_likes values(5,4);
insert into post_likes values(3,4);
insert into post_likes values(2,4);
insert into post_likes values(1,4);






insert into post_shares values(1,2);
insert into post_shares values(4,5);
insert into post_shares values(3,3);
insert into post_shares values(2,4);
insert into post_shares values(5,3);
insert into post_shares values(5,2);
insert into post_shares values(6,1);
insert into post_shares values(6,3);




insert into comments_like values(2,1);
insert into comments_like values(4,2);
insert into comments_like values(3,3);
insert into comments_like values(6,4);
insert into comments_like values(2,5);
insert into comments_like values(3,4);
insert into comments_like values(4,3);
insert into comments_like values(5,2);
insert into comments_like values(6,1);





