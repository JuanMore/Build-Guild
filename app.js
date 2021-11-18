const express = require('express')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const app = express()
const path = require('path');
// model schema
const Build = require('./models/build')
const methodOverride = require('method-override')

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
// parse body
app.use(express.urlencoded({
    extended: true
}))
app.use(methodOverride('methodfield'))

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
    const builds = new Build(req.body.pages)
    await builds.save()
    res.redirect(`/pages/${builds._id}`)
})


app.get('/pages/:id', async (req, res) => {
    // pass in id from req . -> params -> .id
    const builds = await Build.findById(req.params.id)
    res.render('pages/show', {
        builds
    })
})

app.get('/pages/:id/edit', async (req, res) => {
    const builds = await Build.findById(req.params.id)
    res.render('pages/edit', {
        builds
    })
})

app.put('/pages/:id', async (req, res) => {
    const {
        id
    } = req.params
    const builds = await Build.findByIdAndUpdate(id, {
        ...req.body.builds
    })
    res.redirect(`/pages/${builds._id}`)
})

app.post('/pages/:id', async (req, res) => {
    const {
        id
    } = req.params
    await Build.findByIdAndDelete(id)
    res.redirect(`/pages`)
})



const port = 3000
app.listen(port)
console.log("Listening on port:" + port)