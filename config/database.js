const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

// db.on('connected', () => {
//   console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
// });

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
    database = client.db('webfood');
}

function getDb() {
    if (!database) {
        throw { message: 'Database connection not established!'};
    }
    return database;
}

module.exports = {
    connectToDatabase: connect,
    getDb: getDb
};