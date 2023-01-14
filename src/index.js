const express = require("express");
const routes = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(routes);

app.listen(9901, () => {
  console.log("Server is running on port 9901");
});

module.exports = app;
