const express = require("express");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const router = express.Router(); //Creates router object specifically for contact-related routes.
const { submitContact, getContacts, deleteContact, updateContact } = require("../controllers/contactController");

router.post("/", submitContact);  //When a post req comes to /( a path inside this router), hand it over to submitContact.
//Reply Route// Reply Route
router.post("/reply", async (req, res) => {
    console.log("Reply request received:");

    const { contactId, email, message } = req.body;

    console.log("Contact ID:", contactId);
    console.log("Email:", email);
    console.log("Message:", message);

    try {
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Reply to your contact inquiry",
            text: message
        });
        console.log("Resend data:", data);
        console.log("Resend error:", error);
        if (error) {
            return res.status(500).json({
                message: "Failed to send reply.",
                error: error.message || error
            });
        }
        return res.status(200).json({
            message: "Reply sent successfully!",
            data: data
        });
    } catch (error) {
        console.error("Reply route error:", error);

        return res.status(500).json({
            message: "An error occurred while sending the reply.",
            error: error.message
        });
    }
});
router.get("/", getContacts);  
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router; 