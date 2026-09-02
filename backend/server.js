//Server.js starts the express application.
require("dotenv").config();  //Load dotenv and call dotenv's config function. (config() reads the .env file and loads the values into process.env).
const { Resend } = require("resend"); //Load resend tool from installed resend package.
const resend = new Resend(process.env.RESEND_API_KEY);
console.log("Resend API key loaded:", !!process.env.RESEND_API_KEY);
const connectDB = require("./config/db");  //go to config/db get whatever that file exported and store it in a variable called connectDB.
const express = require("express"); //Load express library into my application and call it express.
const cors = require("cors"); //cors allows me control which other origins are allowed to communicate with my backend. 
const session = require("express-session");  //Loads the session package into my application.
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express(); //this creates the actual Express application.

app.use(cors({
    origin: "http://127.0.0.1:5500",  //Only allow requests coming from frontend running at this address.
    credentials: true  //Allow the browser to send credentials such as cookies with those requests.
}));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);
//JSON Middleware
app.use(express.json());  //Comes before route as an authenticity checkpoint before access is granted for route handlers data.
app.use("/api/contact", contactRoutes); //Any request that begins with /api/contact can be handled by contactRoutes.
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000; //local port our computer can to communicate with our application.(Starts Server).

app.get("/", (req, res) => { //if someone visits this this root url (http://localhost:3000) send them this message.
    res.send("C Aghaogwu Portfolio Backened is running!");
});
//API route
app.post("/test", (req, res) => { //handles post requests. (When someone sends a post request to this "/" execute this function).
    console.log(req.body);
    res.json({
        message: "Data recieved successfully!",
        data: req.body
    });
});

//Connect to database before starting the application.
const startServer = async () => {
    await connectDB();  //Run the database connection function and wait for it to finish before moving to the next line.
    app.listen(PORT, () => {   //start the server and listen on port 3000 for for incoming http: request.
        console.log(`Server running on http://localhost:${PORT}`);
    });
};
startServer();

