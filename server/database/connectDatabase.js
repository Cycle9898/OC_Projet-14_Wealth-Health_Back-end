import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const databaseUrl = process.env.DATABASE_URL || "mongodb://localhost/wealthHealthHRnetDB";
async function connectDatabase() {
    try {
        await mongoose.connect(databaseUrl);
        console.log('Database successfully connected');
    }
    catch (error) {
        console.error(`Database Connectivity Error: ${error}`);
        throw new Error(`An error has occurred : ${error}`);
    }
}
export default connectDatabase;
