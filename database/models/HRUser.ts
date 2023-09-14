import mongoose from "mongoose";

export type HRUserType = {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

const HRUserSchema = new mongoose.Schema<HRUserType>({
    email: { type: String,required: true,unique: true },
    password: { type: String,required: true },
    firstName: { type: String,required: true },
    lastName: { type: String,required: true }
});

export default mongoose.model<HRUserType>("HRUser",HRUserSchema);