// add middlewares here related to projects
const Projects = require('./projects-model')

function validateProjectId(req, res, next){
    const { id } = req.params
    Projects.get(id)
        .then(program => {
            if(program) {
                req.params = program
                next()
            } else {
                res.status(404).json({
                    status: 404,
                    message: `Unable to find existing projects by id: ${id}`,
                })
            }
        })
        .catch(next)
}

function verifyProject(req,res,next) {
    const { name, description, completed } = req.body
    if (!name || !description) {
        res.status(400).json({
            status: 400,
            message: 'name and description is required'
        })
    } else {
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
    }
}

module.exports = {
    validateProjectId,
    verifyProject
}