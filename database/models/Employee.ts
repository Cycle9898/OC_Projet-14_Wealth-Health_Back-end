import mongoose from "mongoose";

export type EmployeeType = {
    firstName: string,
    lastName: string,
    birthDate: string,
    startDate: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    department: string
}

const employeeSchema = new mongoose.Schema<EmployeeType>({
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

export default mongoose.model<EmployeeType>("Employee",employeeSchema);