// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const actionsModel = require('./actions-model');
const { validateActionData } = require('./actions-middlware')

// GET /api/actions
router.get('/', async (req, res) => {
    try {
        const actions = await actionsModel.get();
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ error: 'Error getting actions from the database' });
    }
});

// GET /api/actions/:id
router.get('/:id', async (req, res) => {
    try {
        const action = await actionsModel.get(req.params.id);
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error getting action from the database' });
    }
});

// POST /api/actions
router.post('/', async (req, res) => {
    const actionData = req.body;
    if (!actionData.description || !actionData.notes || !actionData.project_id) {
        res.status(400).json({ message: 'Description, notes and project_id are required' });
    } else {
        try {
            const newAction = await actionsModel.insert(actionData);
            res.status(201).json(newAction);
        } catch (error) {
            res.status(500).json({ error: 'Error adding action to the database' });
        }
    }
});

// PUT /api/actions/:id
router.put('/:id', validateActionData, async(req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const updatedAction = await actionsModel.update(id, changes);
        if(updatedAction) {
            res.status(200).json(updatedAction);
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
    } catch(error) {
        res.status(500).json({ error: 'Error updating action in the database' });
    }
});

// DELETE /api/actions/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await actionsModel.remove(id);
        if (deletedCount > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting action from teh database' });
    }
});

module.exports = router;