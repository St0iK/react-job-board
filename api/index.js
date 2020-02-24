const express = require('express');
const app = express();
const redis = require("redis");
const path = require('path');

const { promisify } = require("util");
const client = redis.createClient(process.env.REDIS_URL);
const getAsync = promisify(client.get).bind(client);

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/jobs', async function (req, res) {
    const jobs = await getAsync('github')
    res.header("Access-Control-Allow-Origin", '*');
    return res.send(jobs);
    
});

const port = process.env.PORT || 5000;
app.listen(port);