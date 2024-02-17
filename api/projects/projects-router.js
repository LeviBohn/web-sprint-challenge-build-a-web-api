// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const projectsModel = require('./projects-model');
const { validateProjectData } = require('./projects-middleware')

// GET /api/projects
router.get('/', async (req, res) => {
    try {
        const projects = await projectsModel.get();
        console.log(projects);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error getting projects from the database' });
    }
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const project = await projectsModel.get(id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch {
        res.status(500).json({ error: 'Error getting project from the database' });
    }
});

// POST /api/projects
router.post('/', async (req, res) => {
    const projectData = req.body;
    if (!projectData.name || !projectData.description) {
        res.status(400).json({ message: 'Name and description are required' });
    } else {
        try {
            const newProject = await projectsModel.insert(projectData);
            res.status(201).json(newProject);
        } catch (error) {
            res.status(500).json({ error: 'Error adding project to the database' });
        }
    }
});

// PUT /api/projects/:id
router.put('/:id', validateProjectData, async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const updatedProject = await projectsModel.update(id, changes);
        if (updatedProject) {
            res.status(200).json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating project in the database' });
    }
});

// DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await projectsModel.remove(id);
        if (deletedCount > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting project from the database' });
    }
});

// GET /api/projects/:id/actions
router.get('/:id/actions', async (req, res) => {
    const { id } = req.params;
    try {
        const actions = await projectsModel.getProjectActions(id);
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ error: 'Error getting actions for the project from the database' });
    }
});

module.exports = router;