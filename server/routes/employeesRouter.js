import express from "express";
import * as employeesControllers from "../controllers/employeesControllers.js";
import validateToken from "../middlewares/tokenValidation.js";
import { employeeDataValidationChain, handleValidationErrors } from "../middlewares/reqBodyDataValidation.js";
const employeesRouter = express.Router();
export default employeesRouter;
employeesRouter.get("/", validateToken, employeesControllers.getEmployeesList);
employeesRouter.post("/", validateToken, employeeDataValidationChain, handleValidationErrors, employeesControllers.addEmployee);
employeesRouter.get("/:employeeID", validateToken, employeesControllers.getOneEmployee);
employeesRouter.put("/:employeeID", validateToken, employeeDataValidationChain, handleValidationErrors, employeesControllers.updateOneEmployee);
employeesRouter.delete("/:employeeID", validateToken, employeesControllers.deleteOneEmployee);
