import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./database/connectDatabase.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import yamljs from "yamljs";
import employeeRouter from "./routes/employeesRouter.js";
// Setting up the Express App
dotenv.config();
const app = express();
const port = process.env.PORT && parseInt(process.env.PORT) || 3001;
const url = process.env.API_URL || "http://localhost";
// Connection to the database
connectDatabase();
// Handle CORS issues
app.use(cors());
// Request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// API Documentation
const swaggerDocs = yamljs.load('./swagger/swagger.yaml');
if (process.env.NODE_ENV !== 'production') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
// Handle custom routes
app.use('/api/v1/employees', employeeRouter);
// Standard route
app.get("/", (req, res, next) => {
    res.end("Wealth Health HRnet API v1");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at ${url}:${port}`);
});
