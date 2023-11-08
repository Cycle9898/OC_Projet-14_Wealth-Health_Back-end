import Employee from "../database/models/Employee.js";
/**
 * @description
 * Controller function to get all employees' data
 *
 * @param req - Request
 * @param res - Response
 * @param next - Next function
 */
export function getEmployeesList(req, res, next) {
    Employee.find()
        .select('-__v')
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
/**
 * @description
 * Controller function to save a new employee's data
 *
 * @param req - Request
 * @param res - Response
 * @param next - Next function
 */
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
/**
 * @description
 * Controller function to get a chosen employee's data
 *
 * @param req - Request
 * @param res - Response
 * @param next - Next function
 */
export function getOneEmployee(req, res, next) {
    Employee.findOne({ _id: req.params.employeeID })
        .select('-__v')
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
/**
 * @description
 * Controller function to update a chosen employee's data
 *
 * @param req - Request
 * @param res - Response
 * @param next - Next function
 */
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
/**
 * @description
 * Controller function to delete a chosen employee's data
 *
 * @param req - Request
 * @param res - Response
 * @param next - Next function
 */
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
