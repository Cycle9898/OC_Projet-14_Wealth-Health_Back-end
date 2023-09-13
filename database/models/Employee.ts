import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    firstName: { type: String,required: true },
    lastName: { type: String,required: true },
    birthDate: { type: String,required: true },
    startDate: { type: String,required: true },
    street: { type: String,required: true },
    city: { type: String,required: true },
    state: { type: String,required: true },
    zipCode: { type: String,required: true },
    department: { type: String,required: true }
});

export default mongoose.model("Employee",employeeSchema);