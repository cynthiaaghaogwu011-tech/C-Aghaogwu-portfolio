const express = require("express");
const router = express.Router();
const { getProjects, getProject, createProject, updateProject, deleteProject } = require("../controllers/projectController");
const isAuthenticated = require("../middleware/authMiddleware");  //Security checks to confirm session.
router.get("/", isAuthenticated, getProjects);  //When a GET request reaches / inside this router, run getProjects.
router.get("/:id", isAuthenticated, getProject); //Edit route to get a single project by its ID.
router.post("/", isAuthenticated, createProject);  //Here is a new project, save it.
router.put("/:id", isAuthenticated, updateProject);  //Edit route to update a project by its ID.
router.delete("/:id", isAuthenticated, deleteProject); //Edit route to delete a project by its ID.

module.exports = router;
