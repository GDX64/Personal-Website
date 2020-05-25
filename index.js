const express = require('express')

const app = express();

app.use('/', express.static(__dirname + '/build'));
app.use('/', express.static(__dirname + '/trillo'))
app.get('/ext/pj/trillo', function (req, res, next) {
    res.sendFile(__dirname + '/trillo/trillo.html')
    console.log('hello');
})

app.use('/', function (req, res, next) {
    res.sendFile(__dirname + '/build/index.html');
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server listening on 3000");
})

