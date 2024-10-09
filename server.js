const express = require('express');
const app = express();
const db = require('./db.js');

// const bodyParser = require('body-parser');
// app.use(bodyParser.json()); // req.body

app.use(
    express.urlencoded({ extended: true })
);

app.use(express.json());

// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.method}:${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest);





app.get('/', (req, res) => {
    console.log('in this');
    res.send('welcome to our hotel');
})



app.get('/experience', (req, res) => {
    console.log('experience called');
    res.send('Ok experience');
})


app.get('/idli', (req, res) => {
    const idli = {
        name: 'rava',
        type: 'dry',
        cost: 12.30,
        is_chutney: true
    }
    console.log('experience called');
    res.json(idli);
})

const notes = require('./notes.js');
console.log(notes.age);
const x = notes.addNumber(4, 5);
console.log(x);

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);


const menuItemRoutes = require('./routes/personRoutes');
app.use('/menu', menuItemRoutes);


app.listen('3000');