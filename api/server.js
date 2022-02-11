const express = require('express');
const server = express();
const helmet = require('helmet')
const morgan = require('morgan');
const cors = require('cors')

const projRouter = require('./projects/projects-router')
const actRouter = require('./actions/actions-router')

// Configure your server here
server.use(express.json())
server.use(morgan('dev'))
server.use(helmet())
server.use(cors())

// Build your actions router in /api/actions/actions-router.js
server.use('/api/actions', actRouter)

// Build your projects router in /api/projects/projects-router.js
server.use('/api/projects', projRouter)

// Do NOT `server.listen()` inside this file!
server.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Welcome to Build A Web API Sprint Challenge',
        time: new Date().toLocaleTimeString(),
    })
}) 

server.use('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'Not Found'
    })
})

module.exports = server;
