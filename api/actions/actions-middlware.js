// add middlewares here related to actions
function validateActionData(req, res, next) {
    const { notes, description, completed, project_id } = req.body;
    if (!notes || !description || completed === undefined || !project_id) {
        res.status(400).json({ message: 'Notes, description, completed, and project_id are required' });
    } else {
        next();
    }
}

module.exports = { validateActionData };