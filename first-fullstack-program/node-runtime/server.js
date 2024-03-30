const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/api/message' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Hello from the backend!'}));
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not found');
    }
})

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));