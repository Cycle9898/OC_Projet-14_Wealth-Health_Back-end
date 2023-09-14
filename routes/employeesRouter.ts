import express,{ Router } from "express";
import * as employeesControllers from "../controllers/employeesControllers.js";
import validateToken from "../middlewares/tokenValidation.js";

const employeesRouter: Router = express.Router();
export default employeesRouter;

employeesRouter.get("/",
    validateToken,
    employeesControllers.getEmployeesList
);

employeesRouter.post("/",
    validateToken,
    employeesControllers.addEmployee
);

employeesRouter.get("/:employeeID",
    validateToken,
    employeesControllers.getOneEmployee
);

employeesRouter.put("/:employeeID",
    validateToken,
    employeesControllers.updateOneEmployee
);

employeesRouter.delete("/:employeeID",
    validateToken,
    employeesControllers.deleteOneEmployee
);