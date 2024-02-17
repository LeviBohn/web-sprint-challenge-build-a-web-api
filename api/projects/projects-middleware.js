// add middlewares here related to projects
function validateProjectData(req, res, next) {
    const { name, description, completed } = req.body;
    if (!name || !description || completed === undefined) {
        res.status(400).json({ message: 'Name, description, and completed are required' });
    } else {
        next();
    }
}

module.exports = { validateProjectData };