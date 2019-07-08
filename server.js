const express = require('express');
const responseTime = require('response-time');
const axios = require('axios');
const redis = require('redis');

const app = express();

// create and connect redis client to local machine
const client = redis.createClient();

client.on('error', (err) => {
    console.log('error', err);
});

// use response time as a middleware 
app.use(responseTime());

app.get('/api/search', (req, res) => {
    // extract query from url and trim trailing spaces
    const query = (req.query.query).trim();

    // bulit wikipedia API URL
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${query}`;

    // try fetching the result from Redis first in case we have it cached
    return client.get(`wikipedia:${query}`, (err, result) => {
        // if key exist in redis store
        if(result) {
            const resultJson = JSON.parse(result);
            return res.status(200).json(resultJson);
        } else {
            // key does not exist in Redis
            // fetch from Wikipedia
            return axios.get(searchUrl)
            .then(response => {
                const responseJSON = response.data;
                // store wikipedia API response in Redis
                client.setex(`wikipedia:${query}`, 3600, JSON.stringify({ source: 'Redis Cache', ...responseJSON, }));
                // Send JSON response to client
                return res.status(200).json({source: 'Wikipedia API', ...responseJSON});

            })
            .catch(err => {
                return res.status(500).json(err);
            });
        }
    });

});

app.listen(3000, () => {
    console.log('Server runst on port: 3000');
});
