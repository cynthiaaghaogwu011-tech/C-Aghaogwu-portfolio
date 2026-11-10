const mongoose = require("mongoose");
const Contact = require("../models/contact"); //Import the mongoose Model that acts as an interface between the application and the database.
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = await Contact.create({ name, email, message });
        res.status(201).json({
            message: "Thanks, your message was sent successfully!",
        });
    } catch (error) {
        console.error("CONTACT ERROR:", error);
        res.status(500).json({
            message: "Failed to send your message. Please try again later.",
        });
    }
};
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({
            message: "Contact messages retrieved successfully!",
            data: contacts
        });
    } catch (error) {
        console.error("GET CONTACT ERROR:", error);
        res.status(500).json({ message: "Failed to retrieve contact messages." });
    }
};

const updateContact = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid message ID." });
        }
        // Only the status can be changed
        const { status } = req.body;
        if (typeof status !== "string") {
            return res.status(400).json({ message: "A valid status is required." });
        }
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { returnDocument: "after", runValidators: true }
        );
        if (!contact) {
            return res.status(404).json({ message: "Contact message not found." });
        }
        res.json({
            message: "Contact message updated successfully!",
            data: contact
        });
    } catch (error) {
        console.error("UPDATE CONTACT ERROR:", error);
        res.status(500).json({ message: "Failed to update contact message." });
    }
};

const deleteContact = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid message ID." });
        }
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact message not found." });
        }
        res.json({ message: "Contact message deleted successfully!" });
    } catch (error) {
        console.error("DELETE CONTACT ERROR:", error);
        res.status(500).json({ message: "Failed to delete contact message." });
    }
};

const sendReply = async (req, res) => {
    try {
        const { contactId, message } = req.body;
        if (!mongoose.isValidObjectId(contactId)) {
            return res.status(400).json({ message: "Invalid message ID." });
        }
        if (typeof message !== "string" || message.trim().length < 1 || message.length > 5000) {
            return res.status(400).json({ message: "Reply must be 1 to 5000 characters." });
        }
        // Use the email saved in the database, not one sent from the browser
        const contact = await Contact.findById(contactId);
        if (!contact) {
            return res.status(404).json({ message: "Contact message not found." });
        }
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev", // change after you verify a domain
            to: "cynthiaaghaogwu011@gmail.com", // TEST MODE: change to contact.email after verifying a domain
            subject: "Reply to your contact inquiry",
            text: message.trim()
        });
        if (error) {
            console.error("RESEND ERROR:", error);
            return res.status(500).json({ message: "Failed to send reply." });
        }
        return res.status(200).json({ message: "Reply sent successfully!" });
    } catch (error) {
        console.error("REPLY ROUTE ERROR:", error);
        return res.status(500).json({ message: "An error occurred while sending the reply." });
    }
};
module.exports = {
    submitContact,
    getContacts,
    updateContact,
    deleteContact,
    sendReply
};