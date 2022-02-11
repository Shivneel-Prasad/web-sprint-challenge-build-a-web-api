// Write your "actions" router here!
const Actions = require('./actions-model')
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    
})

router.get('/:id', (req, res, next) => {
    
})

router.post('/', (req, res, next) => {
    
})

router.put('/:id', (req, res, next) => {
    
})

router.delete('/:id', (req, res, next) => {
    
})

router.get('/:id/actions', (req, res, next) => {
    
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "There seems to be a problem with the router.",
    message: err.message,
    stack: err.stack,
  });
  next()
});

module.exports = router