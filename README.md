# nredis (Node Redis)
fetch query data from Wikipedia API and store it in redis(if key not present).
Check the response time,
Open Chrome Developer Tools > Network > /api/search?query=node
and check the response time in "X-Response-Time" (in milliseconds)

# Packages :
<ul>
<li><b>Express - </b> Fast, unopinionated, minimalist web framework for node.</li>
<li><b>Axios - </b>Promise based HTTP client for the browser and node.js</li>
<li><b>Redis - </b>This is a complete and feature rich Redis client for node.js. It supports all Redis commands and focuses on high performance.</li>
<li><b>Response-time - </b> record response time in the response header.</li>
</ul>

# Setup :
1) git clone
2) npm install

# How it works :
Once server is running(on desired PORT),
<br/>query with the URL http://127.0.0.1:3000/api/search?query=php 

