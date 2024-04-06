const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 8080;

// Set up web server so I can read requests
const server = http.createServer((req, res) => {
    if (req.url === '/createFile') {
        createFile(req, res);
    }
    else if (req.url === '/submit-form') {
        createUser(req, res);
    }
});

function createFile(req, res) {
    fs.writeFile(path.join(__dirname, 'test.txt'), 'Test successful!', (err) => {
        if (err) throw err;
    });    
}

function createUser(req, res) {
    
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const userData = JSON.parse(body);
            console.log(`Received user data: ${userData[1]}`);

            // Set CORS headers
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);

            res.end(JSON.stringify(userData));
        } catch (err) {
            console.error(`Error parsing JSON: ${err}`);
            res.end('Error parsing JSON')
        }
    });
}

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));




