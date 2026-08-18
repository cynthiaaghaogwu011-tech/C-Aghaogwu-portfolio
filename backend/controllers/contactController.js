const Contact = require("../models/contact"); //Import the mongoose Model that acts as an interface between the application and the database.

const submitContact = async (req, res) => {
    try {
        console.log("CONTACT RECIEVED:", req.body);
        const contact = await Contact.create(req.body); //Wait for the db operation to finish then contact  Model take the data that came with (req.body) the request and create a new contact doument with it.
        res.json({
            message: "Contact message received  succesfully!",  //When post request reaches this router at /, run this function.
            data: req.body
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
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true});  //req.params.id (which doc.), req.body( what changes will be made), new: true (return updates doc.).
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

module.exports = {
    submitContact,
    getContacts,
    updateContact,
    deleteContact
};