import express from "express"

import {loginUser, signupUser } from "../controllers/authcontroller.js";
import { getUserDetails, getUserBasicDetails, updateUserDetails} from "../controllers/userController.js";
import { handleFileUpload, uploadFile} from "../controllers/profileUploadController.js";
import { handleFileUploading, uploadPostFiles } from "../controllers/postUploadController.js";
import { postData,getPosts ,getPostsOfUser} from "../controllers/postsController.js";
import {getUserSuggestions, setFollowingUsers, getTrendingHashtags} from "../controllers/suggestionsController.js";

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
router.post('/updateProfile',updateUserDetails);
router.get('/suggestions/:userId', getUserSuggestions);

// inserting new follows of user
router.post('/setFollowingUsers', setFollowingUsers);

//uploading posts
router.post('/posts',postData);
router.get('/getposts',getPosts);
router.get('/userposts/:user_id',getPostsOfUser)

// fectching trending hashtags
router.get('/trending/hashtags', getTrendingHashtags);


export default router;
