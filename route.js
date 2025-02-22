const route = require('express').Router()
const sendToTelex = require("./controller")


route.get('/integration', sendToTelex.telexIntegration)
route.get('/youtube/content/tick', sendToTelex.sendToTelex)
module.exports = route