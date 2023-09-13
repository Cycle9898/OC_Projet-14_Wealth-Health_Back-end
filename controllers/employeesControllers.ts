import Employee from "../database/models/Employee.js";
import type { Request,Response,NextFunction } from "express";

export function getEmployeesList(req: Request,res: Response,next: NextFunction) {
    Employee.find()
        .then((employeesList) => {
            res.status(200).json(
                {
                    status: 200,
                    message: "Employees list retrieved successfully",
                    body: employeesList
                });
        })
        .catch((error: unknown) => {
            res.status(400).json({ error });
        });
}

export function addEmployee(req: Request,res: Response,next: NextFunction) {
    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        startDate: req.body.startDate,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        department: req.body.department
    });
    employee.save()
        .then((newEmployee) => {
            res.status(201).json({
                status: 201,
                message: "Employee added successfully",
                body: newEmployee
            })
        })
        .catch((error: unknown) => {
            res.status(400).json({ error });
        })
}

export function getOneEmployee(req: Request,res: Response,next: NextFunction) {
    Employee.findOne({ _id: req.params.employeeID })
        .then((foundEmployee) => {
            res.status(200).json(
                {
                    status: 200,
                    message: "Employee data retrieved successfully",
                    body: foundEmployee
                });
        })
        .catch((error: unknown) => {
            res.status(400).json({ error });
        });
}

export function updateOneEmployee(req: Request,res: Response,next: NextFunction) {
    const employee = new Employee({
        _id: req.params.employeeID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        startDate: req.body.startDate,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        department: req.body.department
    });
    Employee.findOneAndUpdate(
        { _id: req.params.employeeID },
        employee,
        { returnDocument: 'after' })
        .then((updatedEmployee) => {
            res.status(200).json(
                {
                    status: 200,
                    message: "Employee data updated successfully",
                    body: updatedEmployee
                });
        })
        .catch((error: unknown) => {
            res.status(400).json({ error });
        });
}

export function deleteOneEmployee(req: Request,res: Response,next: NextFunction) {
    Employee.deleteOne({ _id: req.params.employeeID })
        .then(() => {
            res.status(200).json(
                {
                    status: 200,
                    message: "Employee deleted successfully"
                });
        })
        .catch((error: unknown) => {
            res.status(400).json({ error });
        });
}