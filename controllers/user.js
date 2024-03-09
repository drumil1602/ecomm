const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmailhandler } = require("../utils/sendMail.js");
const UserModel = require("../models/user");

const userRegistration = async (req, res) => {
  /**
   * 1. Generate Salt
   * 2. Generate hash using salt
   */

  const newUser = new UserModel({
    ...req.body,
  });

  await newUser.save();
  res.json({
    success: true,
    message: "User successfully registered, please login to continue",
  });
};

const userLogin = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.json({
      success: false,
      message: "Invalid username or password",
    });
  }

  const isPasswordCorrect = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  const expiryDateTime = Math.floor(new Date().getTime() / 1000) + 7200; // 1 hr from now

  if (isPasswordCorrect) {
    const payload = {
      email: user.email,
      role: user.role,
      exp: expiryDateTime,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    return res.json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  }
  res.json({
    success: false,
    message: "Invalid username or password",
  });
};

const userLogout = async (req, res) => {
  res.json({
    success: true,
    message: "Dummy Logout API",
  });
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  } else {
    const resetPasswordLink = `http://localhost:10000/api/v1/user/reset-password/${email}`;
    try {
      await sendEmailhandler(email, "forgot Password", `
      here is the link to reset the password ${resetPasswordLink}
    `);
      res.status(200).json({ message: "email is sent to reset password" });
    } catch (err) {
      return res.status(500).json({ message: "we are facing issuse while sending email" });
    }
  }
}
const resetPassword = async (req, res) => {
  console.log(req.params.email);
  const user = await UserModel.findOne({ email: req.params.email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  } else {
    user.password = req.body.password;
    await user.save();
    return res.status(200).json({ message: "password reset successfully" });
  }
}
const changePassword = async (req, res) => {
  try {
    console.log(req.headers.authorization);
    const tokenFromHeaders = req.headers.authorization.split(" ")[1];
    console.log(tokenFromHeaders);
    console.log(jwt.decode(tokenFromHeaders))
    const { email } = jwt.decode(tokenFromHeaders);
    const user = await UserModel.findOne({ email });
    console.log(user)
    console.log(req.body)

    const newPassword = req.body.newPassword;
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (isPasswordCorrect) {
      user.password = newPassword;
      await user.save();
    }else{
      return res.status(403).json({ message: 'Password is not correct' });
    }
    res.status(200).json({ message: "password is changed successfully" });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: "internal server error please try after some time" });
  }
}

const controllers = {
  userRegistration,
  userLogin,
  userLogout,
  forgotPassword,
  resetPassword,
  changePassword
};

module.exports = controllers;
