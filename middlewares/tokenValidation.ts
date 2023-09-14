import type { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

function validateToken(req: Request,res: Response,next: NextFunction) {
    try {
        if (!req.headers.authorization) {
            throw ("Token is missing from header");
        }
        // Extract token and verify it
        const token: string = req.headers.authorization.split(" ")[1];

        jwt.verify(
            token,
            process.env.SECRET_KEY || "Default_Secret_Key"
        );

        return next();
    }
    catch (error: unknown) {
        res.status(401).json({ error });
    }
}

export default validateToken;