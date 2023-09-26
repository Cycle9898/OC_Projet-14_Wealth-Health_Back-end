import { body,ValidationChain,validationResult } from "express-validator";
import type { Request,Response,NextFunction } from "express";
import { statesList,departmentsList } from "../utils/dataValidationLists.js";

/* Set of request body data validators */

// Login validator
export const loginDataValidationChain: ValidationChain[] = [
    body("email")
        .exists({ checkFalsy: true })
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Provide a valid email"),
    body("password")
        .exists()
        .withMessage("Password is required")
        .bail()
        .isString()
        .withMessage("Incorrect password format")
];

// Sign up validator

export const signUpDataValidationChain: ValidationChain[] = [
    ...loginDataValidationChain,
    body(["firstName","lastName"])
        .exists()
        .withMessage("This field is required")
        .bail()
        .isString()
        .withMessage("Incorrect field format")
        .bail()
        .isLength({ min: 2 })
        .withMessage("This field should be at least 2 characters")
];

// Employee data validator

export const employeeDataValidationChain: ValidationChain[] = [
    body(["firstName","lastName","street","city"])
        .exists()
        .withMessage("This field is required")
        .bail()
        .isString()
        .withMessage("Incorrect field format")
        .bail()
        .isLength({ min: 2 })
        .withMessage("This field should be at least 2 characters"),
    body(["birthDate","startDate"])
        .exists()
        .withMessage("This field is required")
        .bail()
        .isString()
        .withMessage("Incorrect field format")
        .bail()
        .isDate({ format: "MM/DD/YYYY" })
        .withMessage("Incorrect date format (MM/DD/YYYY)"),
    body("state")
        .exists()
        .withMessage("This field is required")
        .bail()
        .isString()
        .withMessage("Incorrect field format")
        .bail()
        .isIn(statesList)
        .withMessage("State is invalid"),
    body("zipCode")
        .exists()
        .withMessage("This field is required")
        .bail()
        .isString()
        .withMessage("Incorrect field format")
        .bail()
        .custom((value: string) => {
            // Test zip code with the corresponding Regex
            return /^\d{5}(?:-\d{4})?$/g.test(value);
        })
        .withMessage("ZIP code is invalid"),
    body("department")
        .exists()
        .withMessage("This field is required")
        .bail()
        .isString()
        .withMessage("Incorrect field format")
        .bail()
        .isIn(departmentsList)
        .withMessage("Department is invalid")
];

/* Handle errors middleware */

export function handleValidationErrors(req: Request,res: Response,next: NextFunction) {
    // Get error from data validations
    const errors = validationResult(req);

    // if there is error then return them
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors
        });
    }

    next();
}