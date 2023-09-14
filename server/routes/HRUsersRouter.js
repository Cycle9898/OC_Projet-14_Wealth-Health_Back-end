import express from "express";
import * as HRUsersControllers from "../controllers/HRUsersControllers.js";
const HRUserRouter = express.Router();
export default HRUserRouter;
HRUserRouter.post("/signup", HRUsersControllers.signUp);
HRUserRouter.post("/login", HRUsersControllers.logIn);
