import express from "express"

import {loginUser, signupUser } from "../controllers/authcontroller.js";
import { handleFileUpload, uploadFile} from "../controllers/profileUpload.js";
import { getUserDetails, getUserBasicDetails, updateUserDetails} from "../controllers/userController.js";


const router = express.Router();

//auth routes
router.post("/login", loginUser );
router.post("/signUp", signupUser);

router.post("/upload/:userId", uploadFile, handleFileUpload);

//geting user details
router.get('/userDetails/:userId', getUserBasicDetails);
router.get('/profile/:userId', getUserDetails);
router.post('/updateProfile',updateUserDetails);

export default router;