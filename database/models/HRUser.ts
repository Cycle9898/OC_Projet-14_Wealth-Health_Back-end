import mongoose from "mongoose";

const HRUserSchema = new mongoose.Schema({
    email: { type: String,required: true,unique: true },
    password: { type: String,required: true },
    firstName: { type: String,required: true },
    lastName: { type: String,required: true }
});

export default mongoose.model("HRUser",HRUserSchema);