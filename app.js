if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}
    // require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo')
const helmet = require('helmet')
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
const mongoSanitize = require('express-mongo-sanitize')

const app = express()
const path = require('path');

// model schema
const methodOverride = require('method-override')
const passport = require('passport')
const LocalPassport = require('passport-local');

// Connect to mongoose
// mongoose.connect('mongodb://localhost:27017/BuildGuild')
const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
// mongo injection 
app.use(mongoSanitize({
    replaceWith: '_'
}))

const secret = process.env.SECRET || 'Not a good secret, taaaa'


// newest version syntax - create mongo store for session
const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});


// session config
const sessionConfig = {
    store,
    name: 'yessir',
    secret,
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
// This disables the `contentSecurityPolicy` middleware but keeps the rest.
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

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
    if (!['/login', '/'].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl;
    }

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
    res.status(404).send('Page Not Found:', 404)
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