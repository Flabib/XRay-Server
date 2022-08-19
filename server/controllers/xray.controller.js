const db = require("../models")
const XRay = db.XRay

module.exports = {
    GetAll: (req, res) => {
        XRay.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
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
            origin: req.body.origin,
            content: req.body.content,
            type: req.body.type,
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
    },
}