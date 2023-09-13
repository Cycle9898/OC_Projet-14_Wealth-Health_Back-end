import express,{ Router } from "express";
import * as employeesControllers from "../controllers/employeesControllers.js";

const employeesRouter: Router = express.Router();
export default employeesRouter;

employeesRouter.get("/",employeesControllers.getEmployeesList);

employeesRouter.post("/",employeesControllers.addEmployee);

employeesRouter.get("/:employeeID",employeesControllers.getOneEmployee);

employeesRouter.put("/:employeeID",employeesControllers.updateOneEmployee);

employeesRouter.delete("/:employeeID",employeesControllers.deleteOneEmployee);