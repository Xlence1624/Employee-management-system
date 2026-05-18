import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
    password: {
    type: String,
    required: true,
   e
  },
      role: {
    type: String,
    enum: ['ADMIN', 'EMPLOYEE'], default: 'EMPLOYEE',
   e
  },
  
} , { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;