1. Retrieve All Posts by a Specific User

SELECT Post_ID, Post_Date, Post_Content 
FROM posts 
WHERE Posted_User_ID = 1;

2. Fetch All Comments on a Specific Post

SELECT pc.Comment_ID, u.First_name, u.Last_name, pc.Commented_Date, pc.Comment_Content
FROM post_comments pc
JOIN users u ON pc.Commented_User_ID = u.User_ID
WHERE pc.Post_ID = 5;

3. Count Total Likes on a Specific Post

SELECT COUNT(*) AS Total_Likes 
FROM post_likes 
WHERE Post_ID = 5;

4. Get All Posts That a User Has Liked

SELECT p.Post_ID, p.Post_Content, p.Post_Date, u.First_name, u.Last_name 
FROM post_likes pl
JOIN posts p ON pl.Post_ID = p.Post_ID
JOIN users u ON p.Posted_User_ID = u.User_ID
WHERE pl.Liked_User_ID = 2;

5. Find Users Who Commented the Most

SELECT u.User_ID, u.First_name, u.Last_name, COUNT(pc.Comment_ID) AS Total_Comments
FROM post_comments pc
JOIN users u ON pc.Commented_User_ID = u.User_ID
GROUP BY u.User_ID, u.First_name, u.Last_name
ORDER BY Total_Comments DESC;
