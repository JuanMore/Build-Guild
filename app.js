const express = require('express')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const app = express()
const path = require('path');

mongoose.connect('mongodb://localhost:27017/ResumeCreator')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

const pages = []

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs')
app.engine('ejs', ejsMate);

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/pages', (req, res) => {
    res.render('pages/index');
});

app.get('/pages/new', (req, res) => {
    res.render('pages/new')
})

app.get('/pages/:id', (req, res) => {
    res.render('pages/show')
})



const port = 3000
app.listen(port)
console.log("Listening on port:" + port)