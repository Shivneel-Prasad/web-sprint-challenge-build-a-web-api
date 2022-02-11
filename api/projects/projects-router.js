// Write your "projects" router here!
const PM = require('./projects-model')
const express = require('express')
const router = express.Router()
const { validateProjectId, verifyProject } = require('./projects-middleware')

//[GET-PROJECTS]
router.get('/', async (req, res, next) => {
    try {
        const allProjects = await PM.get()
            res.status(200).json(allProjects)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateProjectId, async (req, res, next) => {
    try { 
        const { id } = req.params
        const project = await PM.get(id);
        if(!project) {
            res.status(404).json({
                status: 404,
                message: 'Specified ID does not Exist',
            })
        } else {
            res.status(200).json(project)
        }
    } catch (err) {
        next(err)
    }
})

//[POST]
router.post('/', verifyProject, (req, res, next) => {
    PM.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
})

//[PUT]
router.put('/:id', validateProjectId, verifyProject, async (req, res, next) => {
    try {
        const { id } = req.params
        const reviseInfo = await PM.update(id, req.body)
            res.status(400).json(reviseInfo)
    } catch (err) {
        next(err)
    }
})

//[DELETE]
router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        const { id } = req.params
        const removeData = await PM.remove(id)
          res.status(200).json(removeData)
    } catch (err) {
        next(err)
    }
})

//[GET-ACTIONS]
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const { id } = req.params
        PM.getProjectActions(id)
            .then(action => {
                res.status(200).json(action)
            })
            .catch(next)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: "There seems to be a problem with the router.",
    error: err.message,    
  });
  next()
});

module.exports = router