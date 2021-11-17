const express = require('express')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const app = express()
const path = require('path');
// model schema
const Build = require('./models/build')

// Connect to mongoose
mongoose.connect('mongodb://localhost:27017/BuildGuild')

const db = mongoose.connection

// mongoose error handling
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

// const pages = []

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs')
app.engine('ejs', ejsMate);

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/pages', async (req, res) => {
    const builds = await Build.find({})
    res.render('pages/index', {
        builds
    });
});

app.get('/pages/new', (req, res) => {
    res.render('pages/new')
})

app.post('/pages', async (req, res) => {
    res.send(req.body)
})

app.get('/pages/:id', (req, res) => {
    res.render('pages/show')
})



const port = 3000
app.listen(port)
console.log("Listening on port:" + port)