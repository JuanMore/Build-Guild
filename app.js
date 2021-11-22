const dotenv = require('dotenv')
dotenv.config({
    path: __dirname + '/.env'
});
const express = require('express')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const morgan = require('morgan')

// Error handlers
const catchErr = require('./helpers/wrapAsync')
const errHandler = require('./helpers/errorhandling')
const {
    buildSchema,
    commentSchema
} = require('./schemas.js')
const Build = require('./models/build')
const Comment = require('./models/comments')

const app = express()
const path = require('path');

// model schema
const methodOverride = require('method-override')

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

app.set('view engine', 'ejs')
app.engine('ejs', ejsMate);
// parse body
app.use(express.urlencoded({
    extended: true
}))


app.use(methodOverride('methodfield'))

/******** Middleware  *******/
// define validation function
const validateBuilds = (req, res, next) => {
    // pass data through to schema
    const {
        error
    } = buildSchema.validate(req.body)
    // if there's an error - pass error to our error handler
    // with details
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new errHandler(msg, 400)
    } else {
        next()
    }
}

// Commment middleware/validation
const valComment = (req, res, next) => {
    const {
        error
    } = commentSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new errHandler(msg, 400)
    } else {
        next()
    }
}


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/pages', catchErr(async (req, res) => {
    const builds = await Build.find({})
    res.render('pages/index', {
        builds
    });
}))

app.get('/pages/new', catchErr(async (req, res) => {
    const builds = await Build.find({})
    res.render('pages/new', {
        builds
    })
}))


app.post('/pages', validateBuilds, catchErr(async (req, res) => {
    const builds = new Build(req.body.pages)
    await builds.save()
    res.redirect(`/pages/${builds._id}`)
}))

app.get('/pages/:id', catchErr(async (req, res) => {
    // pass in id from req . -> params -> .id
    const builds = await Build.findById(req.params.id).populate('comments')
    res.render('pages/show', {
        builds
    })
}))


app.get('/pages/:id/edit', validateBuilds, catchErr(async (req, res) => {
    const builds = await Build.findById(req.params.id)
    res.render('pages/edit', {
        builds
    })
}))

app.put('/pages/:id', validateBuilds, catchErr(async (req, res) => {
    const {
        id
    } = req.params
    const builds = await Build.findByIdAndUpdate(id, {
        ...req.body.pages
    })
    res.redirect(`/pages/${builds._id}`)
}))

app.post('/pages/:id', catchErr(async (req, res) => {
    const {
        id
    } = req.params
    await Build.findByIdAndDelete(id)
    res.redirect(`/pages`)
}))

app.post('/pages/:id/comments', valComment, catchErr(async (req, res) => {
    const builds = await Build.findById(req.params.id)
    const comment = new Comment(req.body.comment)
    // push comment to our comment schema
    builds.comments.push(comment)
    await comment.save()
    await builds.save()
    // redirect to show - display comment
    res.redirect(`/pages/${builds._id}`)
}))

app.delete('/pages/:id/comments/:commentId', catchErr(async (req, res) => {
    const {
        id,
        commentId
    } = req.params
    // pull from comment array
    await Comment.findByIdAndUpdate(id, {
        $pull: {
            comment: commentId
        }
    })
    await Comment.findByIdAndDelete(commentId)
    res.redirect(`/pages/${id}`)
}))

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


const port = 3000
app.listen(port)
console.log("Listening on port:" + port)