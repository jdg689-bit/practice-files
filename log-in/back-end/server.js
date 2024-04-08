const express = require('express');
const app = express();
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const PORT = 8080;

// Configure cors
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
}));

app.use(express.json());

// Create app
app.get('/', (req, res) => {
    res.send('Hello world');
})

app.post('/post-req', (req, res) => {
    console.log('req recieved');
    try {
        res.send('POST request successful, response received.');
    } catch (err) {
        console.error(`Error sending response: ${err}`);
    }
})

app.post('/register', (req, res) => {
    rawData = req.body;
    console.log(rawData);

    const filePath = path.join(__dirname, 'users.json');

    // Read current JSON from file
   fs.readFile(filePath, (err, data) => {
        if (err) console.error(`Error reading file: ${err}`);
        const json = JSON.parse(data);

        // Append newUser object
        json.push(rawData);

        // Write update JSON to file
        fs.writeFile(filePath, JSON.stringify(json), (err) => {
            if (err) console.error(`Error writing to file: ${err}`);
            console.log('Data appended successfully');
            res.send('User created');
        });
    });
})

app.post('/login', async (req, res) => {
    // Read username from the request
    const username = req.body.username;

    // Read contents of users.json file
    const filePath = path.join(__dirname, 'users.json');

    // fsPromises doesn't use a cb -> catch errors instead if promise is rejected
    try {
        const data = await fsPromises.readFile(filePath);
        const existingUsers = JSON.parse(data);

        // Look for matching username
        const matchingUser = existingUsers.find((user) => user.username == username);
        if (!matchingUser) {
            res.send('Username does not exist');
        } 
    } catch (error) {
        console.error(`Error reading file: ${error}`);
    }

    res.send('');
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));




