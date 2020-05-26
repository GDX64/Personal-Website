const express = require('express')
const fs = require('fs')

const app = express();
let visits;
fs.readFile('visits.json', (err, data) => {
    if (err) {
        console.log(err)
        visits = { data: [] };
    } else {
        visits = JSON.parse(data);
        console.log(visits);
    }
});

//counting visits
app.use('/', function (res, req, next) {
    let visit = {
        date: new Date(),
        ip: req.connection.remoteAddress
    }
    visits.data.push(visit)
    let data = JSON.stringify(visits);
    fs.writeFileSync('visits.json', data);
    next()
})

//static server
app.use('/', express.static(__dirname + '/build'));
app.use('/', express.static(__dirname + '/trillo'))
app.get('/ext/pj/trillo', function (req, res, next) {
    res.sendFile(__dirname + '/trillo/trillo.html')
    console.log('hello');
})

//sending visit
app.get('/visits/data', (req, res, next) => {
    res.json(visits)
})

//default route
app.use('/', function (req, res, next) {
    res.sendFile(__dirname + '/build/index.html');
})


//Listening
app.listen(process.env.PORT || 3000, () => {
    console.log("server listening on 3000");
})

