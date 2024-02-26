import express from "express"

import {loginUser, signupUser } from "../controllers/authcontroller.js";
import { handleFileUpload, uploadFile} from "../controllers/profileUpload.js";

const router = express.Router();

router.post("/login", loginUser );

router.post("/signUp", signupUser);

router.post("/upload", uploadFile, handleFileUpload);


export default router;