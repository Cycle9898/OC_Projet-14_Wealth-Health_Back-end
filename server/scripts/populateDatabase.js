import axios from "axios";
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();
// Add a HR user in the database for testing purpose
const hrUser = {
    firstName: "John",
    lastName: "Smith",
    email: "hr@wealth-health.com",
    password: "password123"
};
// port and URL for API request
const port = process.env.PORT && parseInt(process.env.PORT) || 3001;
const hrUserSignUpURL = `http://localhost:${port}/api/v1/hr/signup`;
// API call
axios.post(hrUserSignUpURL, hrUser)
    .then(response => console.log(response))
    .catch((error) => console.log(error));
