var express = require('express');
var cors = require('cors');
var app = express();

const task = require('./db')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/task',cors(corsOptions), function (req, res) {
    task.getTasks((data) => {
        res.json(data);
    })
});

app.get('/task/:id',cors(corsOptions), function (req, res) {
    task.getTask(req.params.id, (data) => {
        res.json(data);
    })
});

app.post('/task',cors(corsOptions), function (req, res) {
    //console.log("hola mundo: "+req.body.task)

    const dataTask = {
        task:req.body.task
    }

    task.insertTask(dataTask, (data) => {
        res.json(data);
    })
});

app.put('/task/:id',cors(corsOptions), function (req, res) {

    const dataTask = {
        task:req.body.task
    }

    task.updateTask(req.params.id,dataTask, (data) => {
        res.json(data);
    })
});

app.delete('/task/:id',cors(corsOptions), function (req, res) {
    task.deleteTask(req.params.id, (data) => {
        res.json(data);
    })
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});