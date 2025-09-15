const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode =200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, Mayang Sari!\n');
});

server.listen(300, () => {
    console.log('Server running at http://localhost:3000/');
});