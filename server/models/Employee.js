import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  userId: {
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

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

export default Employee;