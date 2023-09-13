import Employee from "../database/models/Employee.js";
export function getEmployeesList(req, res, next) {
    Employee.find()
        .then((employeesList) => {
        res.status(200).json({
            status: 200,
            message: "Employees list retrieved successfully",
            body: employeesList
        });
    })
        .catch((error) => {
        res.status(400).json({ error });
    });
}
export function addEmployee(req, res, next) {
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
        });
    })
        .catch((error) => {
        res.status(400).json({ error });
    });
}
export function getOneEmployee(req, res, next) {
    Employee.findOne({ _id: req.params.employeeID })
        .then((foundEmployee) => {
        res.status(200).json({
            status: 200,
            message: "Employee data retrieved successfully",
            body: foundEmployee
        });
    })
        .catch((error) => {
        res.status(400).json({ error });
    });
}
export function updateOneEmployee(req, res, next) {
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
    Employee.findOneAndUpdate({ _id: req.params.employeeID }, employee, { returnDocument: 'after' })
        .then((updatedEmployee) => {
        res.status(200).json({
            status: 200,
            message: "Employee data updated successfully",
            body: updatedEmployee
        });
    })
        .catch((error) => {
        res.status(400).json({ error });
    });
}
export function deleteOneEmployee(req, res, next) {
    Employee.deleteOne({ _id: req.params.employeeID })
        .then(() => {
        res.status(200).json({
            status: 200,
            message: "Employee deleted successfully"
        });
    })
        .catch((error) => {
        res.status(400).json({ error });
    });
}
