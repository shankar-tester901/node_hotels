const express = require('express');
const Person = require('./models/Person');
const db = require('./db.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
app.use(passport.initialize());
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

passport.use(new LocalStrategy(async (USERNAME, password, done) => {

    try {
        //    console.log('Received credentials ', USERNAME, password);
        const user = await Person.findOne({ username: USERNAME });
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }
        //  const isPasswordMatch = user.password === password ? true : false;
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: 'Incorrect password' });

        }
    } catch (error) {
        return done(error);
    }
}))

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', { session: false });
app.get('/', localAuthMiddleware, (req, res) => {
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
app.use('/person', localAuthMiddleware, personRoutes);


const menuItemRoutes = require('./routes/MenuItemRoutes');
app.use('/menu', menuItemRoutes);


app.listen('3000');