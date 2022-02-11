// add middlewares here related to actions
const Actions = require('./actions-model')

function validateActionId(req, res, next){
    const { id } = req.params
    Actions.get(id)
        .then(activity => {
            if(activity) {
                req.params = activity
                next()
            } else {
                res.status(404).json({
                    status: 404,
                    message: `Unable to find existing actions by id: ${id}`,
                })
            }
        })
        .catch(next)
}

function VerifyActions(req,res,next) {
    const { project_id, description, notes, completed } = req.body
    if (!project_id || !description || !notes ) {
        res.status(400).json({ message: 'project_id, description and notes are required' })
    } else {
        req.project_id = project_id
        req.description = description.trim()
        req.notes = notes.trim()
        req.completed = completed
        next()
    }
}

module.exports = { validateActionId, VerifyActions}