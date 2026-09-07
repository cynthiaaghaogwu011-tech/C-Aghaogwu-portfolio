const rateLimit = require("express-rate-limit"); //Rate limiting is a technique used to control the amount of incoming requests to a server withnin a specific time frame.

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: "Too many login attempts. Please try again after later." },
});

module.exports = loginLimiter;