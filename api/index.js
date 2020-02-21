const express = require('express')
const app = express()
const redis = require("redis");
const { promisify } = require("util");
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
 
app.get('/jobs', async function (req, res) {
    const jobs = await getAsync('github')
    res.header("Access-Control-Allow-Origin", '*');
    return res.send(jobs);
    
})
 
app.listen(5000)