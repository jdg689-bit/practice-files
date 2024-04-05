const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 8080;

// Set up web server so I can read requests
const server = http.createServer((req, res) => {
    if (req.url === '/createFile') {
        createFile(req, res);
    }
});

function createFile(req, res) {
    fs.writeFile(path.join(__dirname, 'test.txt'), 'Test successful!', (err) => {
        if (err) throw err;
    });    
}

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));




