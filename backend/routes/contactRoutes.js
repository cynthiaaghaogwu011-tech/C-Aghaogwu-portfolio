const express = require("express");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const router = express.Router(); //Creates router object specifically for contact-related routes.
const { submitContact, getContacts, deleteContact, updateContact } = require("../controllers/contactController");

router.post("/", submitContact);  //When a post req comes to /( a path inside this router), hand it over to submitContact.
//Reply Route
router.post("/reply", async (req, res) => {
    console.log("Reply request recieved:");
    const { contactId, email, message } = req.body;
    console.log("Contact ID:", contactId);
    console.log("Email:", email);
    console.log("Message:", message);

    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reply to your contact inquiry",
        text: message
    });
    console.log("Resend data:", data);
    console.log("Resend error:", error);
    res.json({
        message: "Reply route is working!",
        data: data
    });
});
router.get("/", getContacts);  
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router; 