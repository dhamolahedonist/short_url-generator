import mongoose, { Document } from "mongoose";

interface User extends Document {
   _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  // other properties...
}


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // other properties...
});


const User = mongoose.model<User>("User", userSchema);

export default User;




