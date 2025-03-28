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

6. Retrieve all posts along with the number of likes each post has received

SELECT p.Post_ID, p.Post_Content, COUNT(pl.Liked_User_ID) AS Like_Count
FROM posts p
LEFT JOIN post_likes pl ON p.Post_ID = pl.Post_ID
GROUP BY p.Post_ID, p.Post_Content;

7. Retrieve all comments along with the number of likes each comment has received

SELECT pc.Comment_ID, pc.Comment_Content, COUNT(cl.Comment_liked_User_ID) AS Like_Count
FROM post_comments pc
LEFT JOIN comments_like cl ON pc.Comment_ID = cl.Comment_ID
GROUP BY pc.Comment_ID, pc.Comment_Content;

8. Find the user who has posted the most posts

SELECT u.User_ID, u.First_name, u.Last_name, COUNT(p.Post_ID) AS Post_Count
FROM users u
JOIN posts p ON u.User_ID = p.Posted_User_ID
GROUP BY u.User_ID, u.First_name, u.Last_name
ORDER BY Post_Count DESC;

9. Retrieve the friends list of a specific user

SELECT u.User_ID, u.First_name, u.Last_name
FROM users u
JOIN friends f ON u.User_ID = f.Friend_ID
WHERE f.User_ID = 1;

10. Find the most active user (who has the highest number of likes, comments, and shares combined)

SELECT u.User_ID, u.First_name, u.Last_name, 
       (COUNT(DISTINCT pl.Liked_User_ID) + COUNT(DISTINCT pc.Comment_ID) + COUNT(DISTINCT ps.Shared_User_ID)) AS Activity_Score
FROM users u
LEFT JOIN post_likes pl ON u.User_ID = pl.Liked_User_ID
LEFT JOIN post_comments pc ON u.User_ID = pc.Commented_User_ID
LEFT JOIN post_shares ps ON u.User_ID = ps.Shared_User_ID
GROUP BY u.User_ID, u.First_name, u.Last_name
ORDER BY Activity_Score DESC;





