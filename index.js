const express = require("express");
const api = require("./api");
const app = express();
const port = 3000;

app.get("/hello-world", (req, res) => {
    api.random().then(json => {res.send(json)});
});

app.listen(port, () => {
   console.log('server started');
});