const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({ //creating a schema that says a contact message must have this fields. (The blueprint of what a contactmessage should contain).
    name: {
        type: String,
        required: true
    },
    email: {
    type: String,
    required: true
    },
    message: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        default: "General Inquiry"
    },
    status: {
        type: String,
        default: "new"
    }
},
    {
    timestamps: true
    }
);

const contact = mongoose.model("Contact", contactSchema);  //Mongoose create a model called Contact using the rules in contactSchema. (Contact is the mongoose model my application uses to interact with Mongodb's contact data).

module.exports = contact;