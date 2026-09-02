const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        projectId: {
            type: String, 
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true
        },
        technologies: {
            type: [String],
            required: true
        },
        status: {
            type: String,
            enum: ["draft", "published"],  //Prevents storing things like "published " "live" "complete" etc.
            default: "draft"
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: ""
        },
        liveUrl: {
            type: String,
            default: ""
        },
        githubUrl: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true  //mongoose automatically add createdAt and updatedAt.
    }
    );
    const Project = mongoose.model("Project", projectSchema);
    module.exports = Project;