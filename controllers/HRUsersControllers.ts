import HRUser from "../database/models/HRUser.js";
import type { Request,Response,NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @description
 * Controller function to sign up an user
 * 
 * @param req - Request
 * @param res - Response
 * @param next - Next function
 */
export function signUp(req: Request,res: Response,next: NextFunction) {
    bcrypt.hash(req.body.password,10)
        .then((hash: string) => {
            const hrUser = new HRUser({
                email: req.body.email,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            });
            hrUser.save()
                .then((HRUser) => {
                    const newHRUser = {
                        _id: HRUser._id,
                        email: HRUser.email
                    }

                    res.status(201).json({
                        status: 201,
                        message: "User created Successfully",
                        body: newHRUser
                    });
                })
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
}

/**
 * @description
 * Controller function to login an user
 * 
 * @param req - Request
 * @param res - Response
 * @param next - Next function
 */
export function logIn(req: Request,res: Response,next: NextFunction) {
    HRUser.findOne({ email: req.body.email })
        .then((hrUser) => {
            if (!hrUser) {
                return res.status(401).json({
                    message: "Invalid credentials"
                });
            }
            bcrypt.compare(req.body.password,hrUser.password)
                .then((valid: boolean) => {
                    if (!valid) {
                        return res.status(401).json({
                            message: "Invalid credentials"
                        });
                    }
                    const token: string = jwt.sign(
                        { hrUserId: hrUser._id },
                        process.env.SECRET_KEY || "Default_Secret_Key",
                        { expiresIn: "1d" }
                    );

                    res.status(200).json({
                        status: 200,
                        message: "Login Successfully",
                        token: token
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
}