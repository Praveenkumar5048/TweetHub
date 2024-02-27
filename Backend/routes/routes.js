import express from "express"
import { getUserDetails } from "../controllers/userController.js";
import { loginUser,signupUser } from "../controllers/authcontroller.js";

const router = express.Router();

//auth routes
router.post("/login", loginUser );
router.post("/signUp", signupUser);

//geting user details
router.get('/profile/:userId', getUserDetails);


export default router;