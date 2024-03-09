const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.post("/register", userController.userRegistration);

router.post("/login", userController.userLogin);

router.post("/logout", userController.userLogout);

router.post("/forgot-password", userController.forgotPassword);

router.post("/reset-password/:email",userController.resetPassword);

module.exports = router;