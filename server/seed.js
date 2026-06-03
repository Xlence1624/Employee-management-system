import "dotenv/config";
import connectDB from "./config/db.js";
import User from "./models/user.js";
import bcrypt from "bcrypt";

const TemporaryPassword = "admin123";
async function registerAdmin() {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    if (!ADMIN_EMAIL) {
      cconsole.error("Admin email not found in environment variables.");
      process.exit(1);
    }
    await connectDB();
    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });
    if (existingAdmin) {
      console.log(
        "Admin user already exists. No new admin created.",
        existingAdmin.role,
      );
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(TemporaryPassword, 10);
    const admin = await User.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully with email:");
    console.log(" password:", TemporaryPassword);
    console.log("\nemail:", admin.email);

    console.log("\nchange the password after login ");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

registerAdmin();
