const { MongoClient } = require('mongodb');
require('dotenv').config();


async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function main() {

    const CONNECTION_URI = `mongodb+srv://myAtlasDBUser:${process.env.PASSWORD}@myatlasclusteredu.fz0pefl.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU`;

    // Create instance of MongoClient
    const client = new MongoClient(CONNECTION_URI);

    // Wrap calls to functions that interact with db to handle errors
    try {
        // client.connect() returns a promise
        await client.connect();

        await listDatabases(client);

    } catch (error) {
        console.error(error);
    } finally {
        // finally block runs regardless of result
        await client.close();
    }
}

main().catch(console.error);