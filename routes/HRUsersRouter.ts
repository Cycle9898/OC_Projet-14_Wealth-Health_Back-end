import express,{ Router } from "express";
import * as HRUsersControllers from "../controllers/HRUsersControllers.js";
import { signUpDataValidationChain,loginDataValidationChain,handleValidationErrors } from "../middlewares/reqBodyDataValidation.js";

const HRUserRouter: Router = express.Router();
export default HRUserRouter;

HRUserRouter.post("/signup",
    signUpDataValidationChain,
    handleValidationErrors,
    HRUsersControllers.signUp);

HRUserRouter.post("/login",
    loginDataValidationChain,
    handleValidationErrors,
    HRUsersControllers.logIn
);