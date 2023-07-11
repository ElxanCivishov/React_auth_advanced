const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// jsonwebtoken generate
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};

// register user
const regsiterUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields!");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters!");
  }

  // Check if user email is already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered!");
  }

  // Create new user
  const user = await User.create({ name, email, password });

  // only http requests
  const token = generateToken(user._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter email and password!");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters!");
  }

  // Check if user email is already exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found! Please sign up!");
  }

  // only http requests
  const token = generateToken(user._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //1 day
    sameSite: "none",
    secure: true,
  });

  // user exist , check the password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (user && passwordIsCorrect) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password! Try again!");
  }
});

// logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({ message: "Successfully logged out" });
});

// get user
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log(user);

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = {
  regsiterUser,
  loginUser,
  logoutUser,
  getUser,
};
