const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const fs = require('fs');

app.use(express.json()); // Tells Express to pass incoming request bodies in JSON format if header of incoming request is 'application/json'

app.get('/', (req, res) => {
    res.send('Got a GET request');
});

app.post('/', (req, res) => {
    res.send('Got a POST request');
})

app.post('/mkdir', (req, res) => {
    try {
        fs.mkdir(path.join(__dirname, 'test-folder'), (error) => {
            if (error) throw error;
        });
        console.log('Folder created successfully');
    } catch (error) {
        console.error(`Error making directory ${error}`);
    }
    res.send('') // Must send a response to the client
})

// Create new user based on JSON input
app.post('/mkuser', (req, res) => {
    console.log(`Req header: ${req.headers}`);
    console.log(`Request body: ${req.body}`);
    console.log(`Username: ${req.body['username']}`);

    const data = req.body;
    fs.appendFile(path.join(__dirname, 'userlog.json'), `${JSON.stringify(data)}\n`, (error) => {
        if (error) throw error;
    });

    res.send('');
})

app.listen(PORT, () => {
    console.log(`Demo app listening on port ${PORT}`);
})