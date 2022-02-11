// Write your "actions" router here!
const AM = require('./actions-model')
const express = require('express')
const router = express.Router()
const { validateActionId, VerifyActions } = require('./actions-middleware')

//[GET-ACTIONS]
router.get('/',  (req, res, next) => {
    AM.get()
      .then(reaction => {
        res.status(200).json(reaction)
      })
      .catch(next)
})

router.get('/:id', validateActionId, async (req, res, next) => {
  try { 
      const { id } = req.params
      const reaction = await AM.get(id);
      if(reaction) {
        res.status(200).json(reaction)          
      } else {
        res.status(404).json({
          status: 404,
          message: 'Specified ID does not Exist',
      })
      }
  } catch (err) {
      next(err)
  }
})

//[POST]
router.post('/', VerifyActions, async (req, res, next) => {
  try {
      const body = req.body
      const newReaction = await AM.insert(body)
      if(newReaction) {
          res.status(201).json(newReaction)
      } else {
          res.status(404).json({
              status: 404,
              message: 'Please complete all required fields',
          })
      }
  } catch (err) {
      next(err)
  }
})

//[PUT]
router.put('/:id', validateActionId, VerifyActions, (req, res, next) => {
  const { id } = req.params
  const body = req.body
  AM.update(id, body)
      .then(reformAction => {
          res.status(400).json(reformAction)
      })
      .catch(next)
})

//[DELETE]
router.delete('/:id',validateActionId, (req, res, next) => {
  const { id } = req.params
  AM.remove(id)
      .then(rmReaction => {
          res.status(200).json(rmReaction)
      })
      .catch(next)
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "There seems to be a problem with the action router.",
    message: err.message,
    stack: err.stack,
  });
  next()
});

module.exports = router