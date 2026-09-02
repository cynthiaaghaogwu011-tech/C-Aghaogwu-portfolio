require("dotenv").config();

const bcrypt = require("bcryptjs");
const Admin = require("./models/admin");
const connectDB = require("./config/db");

const resetPassword = async () => {
    try {
        await connectDB();

        const email = "admin@example.com";
        const newPassword = "13512105";

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const admin = await Admin.findOneAndUpdate(
            { email: email },
            { password: hashedPassword },
            { new: true }
        );

        if (!admin) {
            console.log("Admin not found.");
            process.exit(1);
        }

        console.log("Admin password reset successfully!");
        process.exit(0);

    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);
        process.exit(1);
    }
};

resetPassword();