const route = require('express').Router()
const controllers = require("./controller")


route.get("/integration.json", controllers.telexIntegration)
//Route Handling endpoint request
route.post('/tick', controllers.tick)
route.get('/youtube/content', controllers.youtubeFeed)

module.exports = route