import express from "express"

import {loginUser, signupUser } from "../controllers/authcontroller.js";
import { handleFileUpload, uploadFile} from "../controllers/profileUpload.js";
import { getUserDetails ,updateUserDetails} from "../controllers/userController.js";
import { loginUser,signupUser } from "../controllers/authcontroller.js";

const router = express.Router();

//auth routes
router.post("/login", loginUser );
router.post("/signUp", signupUser);

router.post("/upload", uploadFile, handleFileUpload);

//geting user details
router.get('/profile/:userId', getUserDetails);
router.post('/updateProfile',updateUserDetails);

export default router;