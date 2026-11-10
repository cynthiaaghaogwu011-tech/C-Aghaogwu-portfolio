const isAuthenticated = (req, res, next) => {  //Checjs whether a session exist.
    if (!req.session.adminId) {
        return res.status(401).json({
            message: "Unauthorized. Please log in."
        });
    }
    next();
};

module.exports = isAuthenticated;