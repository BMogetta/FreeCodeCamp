require('dotenv').config();

const bodyParser = require('body-parser');

let express = require('express');
let app = express();
console.log('Hello World');

app.use(function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

app.use( bodyParser.urlencoded({extended: false}) );
/*
app.get("/", function(req, res) {
    res.send('Hello Express');
})
*/

app.get("/", function(req, res) {
    const absolutePath = __dirname + "/views/index.html";
    res.sendFile(absolutePath);
})

app.use("/public", express.static( __dirname + "/public" ))
/*
app.get("/json", function(req, res) {
    const msg = {"message": "Hello json"};
    res.json(msg);
})*/

app.get("/json", function(req, res) {
    const upperCase = process.env.MESSAGE_STYLE;
    upperCase == "uppercase"
    ? res.json({"message": "HELLO JSON"})
    : res.json({"message": "Hello json"});
})

app.get("/now", function(req, res, next) {
    const time = new Date().toString();
    req.time = time;
    next();
}, function(req, res) {
    res.json( {time: req.time} );
})

app.get("/:word/echo", function(req, res) {
    const word = req.params.word;
    res.json( {"echo": word} );
})

const nameHandler =  (req, res) => {
    const query = req.query;
    res.json( {"name": `${query.first} ${query.last}`} );
}

app.route("/name").get(nameHandler)//.post(nameHandler)

app.post("/name", function(req, res) {
    const body = req.body;
    res.json( {"name": `${body.first} ${body.last}`} );
})




































module.exports = app;
