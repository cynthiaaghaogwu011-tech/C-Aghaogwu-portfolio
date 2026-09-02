const Contact = require("../models/contact"); //Import the mongoose Model that acts as an interface between the application and the database.
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const submitContact = async (req, res) => {
    try {
        console.log("CONTACT RECIEVED:", req.body);
        const contact = await Contact.create(req.body); //Wait for the db operation to finish then contact  Model take the data that came with (req.body) the request and create a new contact doument with it.
        res.json({
            message: "Contact message received  succesfully!",  //When post request reaches this router at /, run this function.
            data: contact
        });
    } catch (error) { 
        console.error("CONTACT ERROR:", error);
        res.status(500).json({
        message: "Failed to save contact message.",
        error: error.message
        });
    }
};

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json({
            message: "Contact messages retrieved successfully!",
            data: contacts
        });
    } catch (error) {
        console.error("GET CONTACT ERROR:", error);
        res.status(500).json({
            message: "Failed to retrieve contact messages.",
            error: error.message
        });
    }
};

const updateContact = async (req, res) =>{
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });  //req.params.id (which doc.), req.body( what changes will be made), new: true (return updates doc.).
        res.json({
            message: "Contact message update contact successfully!",
            data: contact
        });
    } catch (error) {
        console.error("UPDATE CONTACT ERROR:", error);
        res.status(500).json({
            message: "Failed to update contact message.",
            error: error.message
        });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        res.json({
            message: "Contact message delete successfully!",
            data: contact
        });
    } catch (error) {
        console.error("DELETE CONTACT ERROR:", error);
        res.status(500).json({
            message: "Failed to delete contact message.",
            error: error.message
        });
    }
};

//Reply Route
const sendReply = async (req, res) => {
    console.log("Reply request received:");

    const { contactId, email, message } = req.body;
    console.log("Contact ID:", contactId);
    console.log("Email:", email);
    console.log("Message:", message);
    try {
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "cynthiaaghaogwu011@gmail.com",
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
};

module.exports = {
    submitContact,
    getContacts,
    updateContact,
    deleteContact,
    sendReply
};