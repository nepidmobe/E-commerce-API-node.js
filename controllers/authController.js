const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../utils");
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
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError(
      "please provide missing email or password"
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError(
      "there is no account registered with those credentials"
    );
  }
  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new CustomError.UnauthenticatedError("credential mismatch");
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
  //set cookie value for same name set in login/register to random string which gives wrong jwt.
  //and set time expiry very small or 0 eg here i set 5 sec first now 0(current time)
  //you can alse set value for cookie key to empty string"". for random string that comes to your mind is ok.

  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "logged out" });
  // as far log out you don't have to send anything back. only status code is enough
  //log-out, there is refres button in console application in browwser to know expiry date in browser
};

module.exports = { register, login, logout };
