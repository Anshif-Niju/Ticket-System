import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();


    // Hash passwords
    const adminPassword = await bcrypt.hash("admin123", 10);
    const supportPassword = await bcrypt.hash("support123", 10);

    // Create users
    await User.insertMany([
      {
        name: "Admin",
        email: "admin@gmail.com",
        password: adminPassword,
        role: "admin",
      },
      {
        name: "Support",
        email: "support@gmail.com",
        password: supportPassword,
        role: "support",
      },
    ]);

    console.log(" Users Seeded Successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();
