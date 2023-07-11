const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWQ4YWQ0ZGQ3MjkxODRhMGViMDc4ZCIsImlhdCI6MTY4OTA5NDk2MywiZXhwIjoxNjg5MTgxMzYzfQ.x-92ejox1Mh9Ql7-tqCzPKuGbRaWEp3QxR3JSp-PQhA";
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(verified);
    // Get user from the token
    user = await User.findById(verified.id).select("-password");
    if (!user) {
      throw new Error("No user with specified id");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});

module.exports = protect;
