import express,{ Express,Request,Response,NextFunction } from "express";
import dotenv from "dotenv";
import connectDatabase from "./database/connectDatabase.js";
import cors from "cors";
import swaggerUi,{ JsonObject } from "swagger-ui-express";
import yamljs from "yamljs";
import employeeRouter from "./routes/employeesRouter.js";
import HRUsersRouter from "./routes/HRUsersRouter.js";

// Setting up the Express App
dotenv.config();

const app: Express = express();
const port: number = process.env.PORT && parseInt(process.env.PORT) || 3001;
const url: string = process.env.API_URL || "http://localhost";

// Connection to the database
connectDatabase();

// Handle CORS issues
app.use(cors());

// Request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Documentation
const swaggerDocs: JsonObject = yamljs.load('./swagger/swagger.yaml');

if (process.env.NODE_ENV !== 'production') {
    app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))
}

// Handle custom routes
app.use('/api/v1/hr',HRUsersRouter);
app.use('/api/v1/employees',employeeRouter);

// Standard route
app.get("/",(req: Request,res: Response,next: NextFunction) => {
    res.end("Wealth Health HRnet API v1");
});

app.listen(port,() => {
    console.log(`[server]: Server is running at ${url}:${port}`);
});
