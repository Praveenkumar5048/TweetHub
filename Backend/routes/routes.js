import express from "express"

import {loginUser, signupUser } from "../controllers/authcontroller.js";

import { getUserDetails, getUserBasicDetails, updateUserDetails, getUserSuggestions, setFollowingUsers} from "../controllers/userController.js";
import { handleFileUpload, uploadFile} from "../controllers/profileUploadController.js";

import { handleFileUploading, uploadPostFiles } from "../controllers/postUploadController.js";
import { postData,getPosts } from "../controllers/postsController.js";

const router = express.Router();

//auth routes
router.post("/login", loginUser );
router.post("/signUp", signupUser);

//uploading the post and phots
router.post("/upload/:userId", uploadFile, handleFileUpload);
router.post('/uploadpost/:userId',uploadPostFiles, handleFileUploading);

//geting user details
router.get('/userDetails/:userId', getUserBasicDetails);
router.get('/profile/:userId', getUserDetails);
router.get('/suggestions/:userId', getUserSuggestions);

// inserting new follows of user
router.post('/setFollowingUsers', setFollowingUsers);

//uploading posts
router.post('/posts',postData);
router.get('/getposts',getPosts);

export default router;
