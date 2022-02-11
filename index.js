const server = require('./api/server')

// to inject the config vars inside the .env
require('dotenv').config()

// if process.env.PORT is undefined than it will fall back to port: 9000
const port = process.env.PORT || 9000

server.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
