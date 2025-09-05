import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },    // for normal login
  googleId: { type: String },    // for Google OAuth login
}, { timestamps: true });

export default mongoose.model("User", userSchema);
