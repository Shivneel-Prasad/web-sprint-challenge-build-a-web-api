// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId (req, res, next) {
    try {
        const { id } = req.params
        const project = await Projects.get(id)
        if(project) {
            req.params = project
            next()
        } else {
            res.status(404).json({
                status: 404,
                message: `Unable to find Project by id: ${id}`,
            })
        }
    } catch (err) {
        next(err)
    }
}

async function verifyProject(req, res, next) {
    try {
        const { name, description, completed } = req.body
        if (!name || !name.trim()) {
            res.status(400).json({
                status: 400,
                message: 'Name field is required'
            })
        } else if (!description || !description.trim()) {
            res.status(400).json({
                status: 400,
                message: 'Description field is required'
            })
        } else {
            req.name = name.trim()
            req.description = description.trim()
            req.completed = completed
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    validateProjectId,
    verifyProject
}