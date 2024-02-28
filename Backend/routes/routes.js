import express from "express"

import {loginUser, signupUser } from "../controllers/authcontroller.js";
import { handleFileUpload, uploadFile} from "../controllers/profileUpload.js";
import { getUserDetails, getUserBasicDetails, updateUserDetails, getUserSuggestions, setFollowingUsers} from "../controllers/userController.js";

const router = express.Router();

//auth routes
router.post("/login", loginUser );
router.post("/signUp", signupUser);

//Update user profile data
router.post("/upload/:userId", uploadFile, handleFileUpload);
router.post('/updateProfile',updateUserDetails);

//geting user details
router.get('/userDetails/:userId', getUserBasicDetails);
router.get('/profile/:userId', getUserDetails);
router.get('/suggestions/:userId', getUserSuggestions);

// inserting new follows of user
router.post('/setFollowingUsers', setFollowingUsers);


export default router;

