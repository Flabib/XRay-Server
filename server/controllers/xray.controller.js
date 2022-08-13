const db = require("../models")
const XRay = db.XRay

module.exports = {
    Root: (req, res) => {
        XRay.findAll()
            .then(data => {
                res.render('index', {
                    data: data,
                })
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving XRay."
                })
            })
    },
    GetAll: (req, res) => {
        XRay.findAll()
            .then(data => {
                res.send({data: data})
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving XRay."
                })
            })
    },
    Add: (req, res) => {
        const io = req.app.get('socketio')
        const xray = {
            backtrace: req.body.backtrace,
            message: req.body.message,
        }

        XRay.create(xray)
            .then(data => {
                io.emit('data', data)

                res.send({data: data})
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the XRay."
                })
            })
    }
}