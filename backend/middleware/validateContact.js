const { body, validationResult } = require("express-validator");

const contactValidationRules = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 2, max: 100 }).withMessage("Name must be 2 to 100 characters")
        .not().matches(/[\r\n]/).withMessage("Name contains invalid characters"),
    body("email")
        .trim()
        .isEmail().withMessage("Please provide a valid email address")
        .isLength({ max: 254 }).withMessage("Email is too long"),
    body("message")
        .trim()
        .notEmpty().withMessage("Message is required")
        .isLength({ min: 10, max: 2000 }).withMessage("Message must be 10 to 2000 characters"),
        body("subject")
    .trim()
    .isLength({ max: 150 }).withMessage("Subject must be 150 characters or fewer"),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg, // frontend reads this
            errors: errors.array(),
        });
    }
    next();
};

module.exports = { contactValidationRules, handleValidationErrors };