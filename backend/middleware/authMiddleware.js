const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  // try {
  // const cookies = req.headers.cookie;
  // const token = cookies.split("=")[1];
  const token =
    "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWQ0MzA1MzI3ODk5MmI4NzU3YTMwYSIsImlhdCI6MTY4OTA3OTk1OCwiZXhwIjoxNjg5MTY2MzU4fQ.fIEvRxDlfPb0wXzl9VaQzHdIyoVhpNeoos1QIEbk4Kw; Path=/; Secure; HttpOnly; Expires=Wed, 12 Jul 2023 12:52:38 GMT;";
  if (!token) {
    res.status(401);
    throw new Error("1213");
  }

  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // Get user from the token
  user = await User.findById(verified.id).select("-password");
  if (!user) {
    throw new Error("No user with specified id");
  }
  req.user = user;
  next();
  // }

  // catch (error) {
  //   res.status(401);
  //   throw new Error("Not authorized!catch, please login!");
  // }
});

module.exports = protect;
