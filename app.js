const express = require("express");
const router = require("./src/routers/router");
require("./src/db/mongoDb");
const app = express();
const AWS = require("aws-sdk");
var PORT = 4000;

app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log("Server listening on PORT", PORT);
});
