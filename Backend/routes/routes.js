import express from "express"

import {loginUser, signupUser } from "../controllers/authcontroller.js";

const router = express.Router();

router.get('/login', loginUser );

router.post("/signUp", signupUser);

export default router;