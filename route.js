const route = require('express').Router()

const checkVideo = require("./controller.js")

module.exports = route.get('/youtube/content', checkVideo)