
require("dotenv").config();
const express = require("express");
const route = require("./route.js")
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/telex', route)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
