const express = require("express");
const router = express.Router(); //Creates router object specifically for contact-related routes.
const {
    submitContact,
    getContacts,
    deleteContact,
    updateContact,
    sendReply
} = require("../controllers/contactController");

router.post("/", submitContact);  //When a post req comes to /( a path inside this router), hand it over to submitContact.
router.post("/reply", sendReply);
router.get("/", getContacts);  
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router; 