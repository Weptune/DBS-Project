CREATE TABLE users(
  User_ID INT NOT NULL,
  Email_ID VARCHAR(25) NOT NULL,
  Phone_No CHAR(10) NOT NULL,
  Pass_word VARCHAR(20) NOT NULL,
  First_name VARCHAR(20) NOT NULL,
  Last_name VARCHAR(20),
  City VARCHAR(20),
  PinCode INT,
  DOB DATE NOT NULL,
  Gender CHAR(10),
  PRIMARY KEY(User_ID)
);



