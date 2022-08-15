const path = require('path')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const db = require("./models")
const XRayController = require('./controllers/xray.controller')

const runServer = (port, callback) => {
    db.sequelize.sync({ force: false })
        .then(() => {
            console.log("Synced db.")
        })
        .catch((err) => {
            console.log("Failed to sync db: " + err.message)
        })

    app.set('views', path.join(__dirname + '/views'))
    app.set('view engine', 'ejs')
    app.set('socketio', io)
    app.use(express.static(path.join(__dirname + '/public')))
    app.use(express.json())

    app.get('/', XRayController.Root)
    app.get('/xray', XRayController.GetAll)
    app.post('/xray', XRayController.Add)

    server.listen(port, () => {
        console.log(`XRay Server listening on port ${port}`)

        callback()
    })
}

module.exports = runServer