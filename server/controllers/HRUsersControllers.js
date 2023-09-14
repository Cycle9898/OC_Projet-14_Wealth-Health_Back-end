import HRUser from "../database/models/HRUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export function signUp(req, res, next) {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
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
            };
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
export function logIn(req, res, next) {
    HRUser.findOne({ email: req.body.email })
        .then((hrUser) => {
        if (!hrUser) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        bcrypt.compare(req.body.password, hrUser.password)
            .then((valid) => {
            if (!valid) {
                return res.status(401).json({
                    message: "Invalid credentials"
                });
            }
            const token = jwt.sign({ hrUserId: hrUser._id }, process.env.SECRET_KEY || "Default_Secret_Key", { expiresIn: "1d" });
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
