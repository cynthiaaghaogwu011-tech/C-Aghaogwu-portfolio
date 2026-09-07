const {  body, validationResult } = require("express-validator"); 

const contactValidationRules = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("email")
        .trim()
        .isEmail().withMessage("Please provide a valid email address"),
    body("message")
        .trim()
        .notEmpty().withMessage("Message is required")
        .isLength({ min: 10 }).withMessage("Message must be at least 10 characters")
];
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { contactValidationRules, handleValidationErrors };
