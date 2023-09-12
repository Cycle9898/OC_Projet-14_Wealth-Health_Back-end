import express,{ Express,Request,Response,NextFunction } from "express";
import dotenv from "dotenv";
import connectDatabase from "./database/connectDatabase.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import yamljs from "yamljs";

// Setting up the Express App
dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 3001;

// Connection to the database
connectDatabase();

// Handle CORS issues
app.use(cors());

// API Documentation
const swaggerDocs = yamljs.load('./swagger/swagger.yaml');

if (process.env.NODE_ENV !== 'production') {
    app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))
}

// Standard routes
app.get("/",(req: Request,res: Response,next: NextFunction) => {
    res.end("Wealth Health HRnet API v1");
});

app.listen(port,() => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});