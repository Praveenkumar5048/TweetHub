// route.js
import express from "express";
import {
  loginUser,
  signupUser,
} from "../controllers/authcontroller.js";
import {
  getUserDetails,
  getUserBasicDetails,
  updateUserDetails,
} from "../controllers/userController.js";
import {
  handleFileUpload,
  uploadFile,
} from "../controllers/profileUploadController.js";
import {
  handleFileUploading,
  uploadPostFiles,
} from "../controllers/postUploadController.js";
import {
  postData,
  getPosts,
  getPostsOfUser,
} from "../controllers/postsController.js";
import {
  getUserSuggestions,
  getTrendingHashtags,
} from "../controllers/suggestionsController.js";
import * as FollowerController from "../controllers/followController.js"; 

const router = express.Router();

// Auth routes
router.post("/login", loginUser);
router.post("/signUp", signupUser);

// Uploading posts and photos
router.post("/upload/:userId", uploadFile, handleFileUpload);
router.post("/uploadpost/:userId", uploadPostFiles, handleFileUploading);

// Getting user details
router.get("/userDetails/:userId", getUserBasicDetails);
router.get("/profile/:userId", getUserDetails);
router.post("/updateProfile", updateUserDetails);
router.get("/suggestions/:userId", getUserSuggestions);

// Inserting new follows of user
router.post("/setFollowingUsers", FollowerController.setFollowingUsers);
router.post("/unsetFollowingUsers", FollowerController.unsetFollowingUsers); // New route for unfollowing
router.get("/getFollowers/:userId", FollowerController.getFollowers); // New route for getting followers
router.get("/getFollowing/:userId", FollowerController.getFollowing); // New route for getting following
router.post("/checkFollowerStatus", FollowerController.checkFollowerStatus); // New route for checking follower status

// Uploading posts
router.post("/posts", postData);
router.get("/getposts", getPosts);
router.get("/userposts/:user_id", getPostsOfUser);

// Fetching trending hashtags
router.get("/trending/hashtags", getTrendingHashtags);

export default router;
