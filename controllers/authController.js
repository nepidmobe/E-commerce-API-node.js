const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  //   const emailAlreadyExist = await User.findOne({ email });
  //   if (emailAlreadyExist) {
  //     throw new CustomError.BadRequestError("Email Already Exist");
  //   }

  //set first created user as admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const user = await User.create({ name, email, password, role }); //to prevent user cannot creat admin from frontend
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};

const login = async (req, res) => {
  res.send("log in");
};
const logout = async (req, res) => {
  res.send("log out");
};

module.exports = { register, login, logout };
