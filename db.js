const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/hotels'; //this creates the database automatically for hotels 
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to mongoDB server ');
})

db.error('error', (error) => {
    console.log('Error connecting to mongoDB server ' + error);
})

db.on('disconnected', () => {
    console.log('Disconnected from mongoDB server ');
})

module.exports = db;