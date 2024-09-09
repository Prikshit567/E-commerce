const express = require("express");
const { registerUser, loginUser, logOutUser, forgetPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUserDetails, updateRole, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser, roleAutherized } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/reset").post(forgetPassword);
router.route("/logout").get(logOutUser);
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticatedUser, getUserDetails)
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);

router.route("/admin/allusers").get(isAuthenticatedUser, roleAutherized("admin"), getAllUsers);

router.route("/admin/user/:id").get(isAuthenticatedUser, roleAutherized("admin"), getSingleUserDetails);

router.route("/admin/user/:id").put(isAuthenticatedUser, roleAutherized("admin"), updateRole);

router.route("/admin/user/:id").delete(isAuthenticatedUser, roleAutherized("admin"), deleteUser); 

module.exports = router;