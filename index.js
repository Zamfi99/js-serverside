const express = require("express");
const api = require("./api");
const app = express();
const port = 3000;

const jwt = require("jsonwebtoken");

const config = {
    secret: "anaAreMere"
};

app.use(express.json());

app.get("/hello-world", (req, res) => {
    api.random().then(json => {
        res.send(json)
    });
});

const authorizationMiddleware = (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        res.status(418).send({
            status: "ok"
        });
    } else {
        const jwtToken = authorization.replace('Bearer ', '');
        jwt.verify(jwtToken, config.secret, (err, decoded) => {
            if (err) {
                res.status(418).send({
                    status: "not ok"
                });
            } else {
                next();
            }
        });
    }
};

app.post('/graphql', authorizationMiddleware, (req, res) => {
    res.send({
        status: "ok"
    });
});

app.post('/graphql/public', (req, res) => {
    const {user, pass} = req.body;
    if (user === "Mamfi" && pass === "cocaine") {
        jwt.sign({}, config.secret, (err, token) => {
           res.send({
               token
           });
        });
    } else {
        res.status(418).send({
            status: "not ok"
        });
    }
});

app.listen(port, () => {
    console.log('server started');
});