const express = require("express");
const router = express.Router(); //Creates router object specifically for contact-related routes.
const isAuthenticated = require("../middleware/authMiddleware");
const { contactValidationRules, handleValidationErrors } = require("../middleware/validateContact");
const {
    submitContact,
    getContacts,
    deleteContact,
    updateContact,
    sendReply
} = require("../controllers/contactController");

router.post("/", contactValidationRules, handleValidationErrors, submitContact);  //When a post req comes to /( a path inside this router), hand it over to submitContact.
router.post("/reply", isAuthenticated, sendReply);
router.get("/", isAuthenticated, getContacts);  
router.put("/:id", isAuthenticated, updateContact);
router.delete("/:id", isAuthenticated, deleteContact);

module.exports = router; 