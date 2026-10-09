const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { userName, email, password, role = "user" } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [
      {
        userName: userName,
      },
      { email: email },
    ],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    userName,
    email,
    password: hash,
    role,
  });

  const token = jwt.sign(
    { is: user._id, role: user.role },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    },
  });
}

async function loginUser(req, res) {
  const { userName, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ userName: userName }, { email: email }],
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");

  res.status(200).json({
    message: "User logged out successfully",
  });
}

module.exports = { registerUser, loginUser, logoutUser };
