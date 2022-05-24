const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetail, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require("../controllers/UserController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetail);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser).put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;