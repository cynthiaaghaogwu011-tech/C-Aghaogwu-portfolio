const Project = require("../models/project");
const getProjects = async (req, res) => {
    try { 
        const projects = await Project.find();
        res.json({
            message: "Projects retrieved successfully!",
            data: projects
        });
    } catch (error) {
        console.error("GET PROJECTS ERROR:", error);
        res.status(500).json({
            message: "Failed to retrieve projects.",
            error: error.message
        });
    }
};

const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({  //404 the server is working but requested project doesnt exist.
                message: "Project not found."
            });
        }
        res.json({
            message: "Project retrieved successfully!",
            data: project
        });
    } catch (error) {
        console.error("GET PROJECT ERROR:", error);
        res.status(500).json({
            message: "Failed to retrieve project.",
            error: error.message
        });
    }
};

const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({  // 201 is a Http method that  means the resource successfully created..
            message: "Project created successfully!",
            data: project
        });
    } catch (error) {
        console.error("CREATE PROJECT ERROR:", error);
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Project ID already exists.",
                error: "The projectId must be unique."
            });
        }
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid project data",
                error: error.message
            });
        }
        res.status(500).json({
            message: "Failed to create project.",
            error: error.message
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body,
            { 
                new: true,
                runValidators: true
             });
        if (!project) {
            return res.status(404).json({
                message: "Project not found."
            });
        }
        res.json({
            message: "Project updated successfully!",
            data: project
        });
    } catch (error) {
        console.error("UPDATE PROJECT ERROR:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid project data.",
                error: error.message
            });
        }
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Project ID already exists.",
                error: "The projectId must be unique."
            });
        }
        res.status(500).json({
            message: "Failed to update project.",
            error: error.message
        });
    }
};

const  deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({
                message: "Project not found."
            });
        }
        res.json({
            message: "Project deleted successfully!",
            data: project
        });
    }  catch (error) {
        console.error("DELETE PROJECT ERROR:", error);
        res.status(500).json({
            message: "Failed to delete project.",
            error: error.message
        });
    }
};

module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
};
