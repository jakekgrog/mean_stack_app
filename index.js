const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Could NOT connect to databse: ' + err);
    } else {
        console.log('Connected to database: ' + config.db);
    }
});

app.use(express.static(__dirname + '/client/dist/'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/dist/index.html'));
    console.log('A user has connected.');
}).listen(8888, () => {
    console.log('Listening on port 8888');
});