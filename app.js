const dotenv = require('dotenv')
dotenv.config({
    path: __dirname + '/.env'
});
const express = require('express')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')
const pageRoutes = require('./routes/pages')
const commentsRoutes = require('./routes/comments')
const authRoutes = require('./routes/auth')
// Error handlers
const catchErr = require('./helpers/wrapAsync')
const errHandler = require('./helpers/errorhandling')
const {
    buildSchema,
    commentSchema
} = require('./schemas.js')
const Build = require('./models/build')
const Comment = require('./models/comments')
const User = require('./models/user')

const app = express()
const path = require('path');

// model schema
const methodOverride = require('method-override')
const passport = require('passport')
const LocalPassport = require('passport-local')

// Connect to mongoose
// mongoose.connect('mongodb://localhost:27017/BuildGuild')
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/BuildGuild'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

// mongoose error handling
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

// const pages = []

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));

// session config
const sessionConfig = {
    secret: 'Shady99',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.set('view engine', 'ejs')
app.engine('ejs', ejsMate);
// parse body
app.use(express.urlencoded({
    extended: true
}))


app.use(methodOverride('methodfield'))
app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalPassport(User.authenticate()))

// store user in session
passport.serializeUser(User.serializeUser())
// get user out of session
passport.deserializeUser(User.deserializeUser())




app.get('/', (req, res) => {
    res.render('home')
})

app.use((req, res, next) => {
    // all templates should have access to current user
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})


app.use('/', authRoutes)
app.use('/pages', pageRoutes)
app.use('/pages/:id/comments', commentsRoutes)

app.all('*', (req, res, next) => {
    res.send('Page Not Found:', 404)
})

app.use((err, req, res, next) => {
    const {
        statusCode = 404
    } = err
    if (!err.message) err.message = 'Looks like we\'ve hit a snag'
    res.status(statusCode).render('pages/error', {
        err
    })
})

app.listen(process.env.PORT || 3000)