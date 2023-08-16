const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

// db.on('connected', () => {
//   console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
// });

// mongodb+srv://webfood:<password>@cluster0.gsrox4a.mongodb.net/

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
    const client = await MongoClient.connect('mongodb+srv://webfood:<webfood>@cluster0.gsrox4a.mongodb.net/');
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