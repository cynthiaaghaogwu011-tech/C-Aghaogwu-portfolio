const Admin = require("../models/admin");  //Import the admin model.
const bcrypt = require("bcryptjs");  //Imports the pasword-hashing library installed.

const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({  name, email, password: hashedPassword });
        res.status(201).json({
            message: "Admin registered successfully!",
            data: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });
    } catch (error) {
        console.error("REGISTER ADMIN ERROR:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid admin data.",
                error: error.message
            });
        }
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Admin email already exists.",
                error: "The email must be unique."
            });
        }
        res.status(500).json({
            message: "Failed to register admin.",
            error: error.message
        });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({ message: "Invalid email or password." });
        }
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
        req.session.regenerate((err) => {
            if (err) {
                console.error("SESSION REGENERATE ERROR:", err);
                return res.status(500).json({ message: "Failed to login." });
            }
            req.session.adminId = admin._id;
            req.session.save((saveErr) => {
                if (saveErr) {
                    console.error("SESSION SAVE ERROR:", saveErr);
                    return res.status(500).json({ message: "Failed to login." });
                }

                res.json({
                    message: "Login successful!",
                    data: { id: admin._id, name: admin.name, email: admin.email },
                });
            });
        });
    } catch (error) {
        console.error("LOGIN ADMIN ERROR:", error);
        res.status(500).json({ message: "Failed to login." });
    }
};
const checkAuth = (req, res) => {
    if (!req.session.adminId) {
        return res.status(401).json({
            message: "Not authenticated."
        });
    }
    res.json({
        message: "Authenticated.",
        adminId: req.session.adminId
    });
};

const logoutAdmin = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("LOGOUT ERROR:", error);
            return res.status(500).json({
                message: "Failed to log out."
            });
        }
        res.clearCookie("connect.sid");
        res.json({
            message: "Logout successful."
        });
    });
};

module.exports = {
    registerAdmin,
    loginAdmin,
    checkAuth,
    logoutAdmin
};
