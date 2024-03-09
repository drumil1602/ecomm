const express = require("express");

const userController = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/register", userController.userRegistration);

router.post("/login", userController.userLogin);

router.post("/logout", userController.userLogout);

router.post("/forgot-password", userController.forgotPassword);

router.post("/reset-password/:email",userController.resetPassword);

router.post("/change-password",authMiddleware(["seller","admin","buyer"]), userController.changePassword);

module.exports = router;