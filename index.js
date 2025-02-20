require("dotenv").config();
const express = require("express");
const route = require("./route.js")
const telexIntegration = require("./telex-integration.js")

const app = express();

app.use(express.json());
app.use(express.static('public'))

app.use('/api/telex',route)
app.use('/integration', telexIntegration)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
