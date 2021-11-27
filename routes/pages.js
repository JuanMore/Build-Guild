const express = require('express')
const router = express.Router()
const catchErr = require('../helpers/wrapAsync')
const errHandler = require('../helpers/errorhandling')
const Build = require('../models/build')
const {
    isAuth
} = require('../middleware')
const {
    buildSchema,
} = require('../schemas.js')
const passport = require('passport')

const validateBuilds = (req, res, next) => {
    // pass data through to schema
    const {
        error
    } = buildSchema.validate(req.pages)
    // if there's an error - pass error to our error handler
    // with details
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new errHandler(msg, 400)
    } else {
        next()
    }
}

// Pages routes

router.get('/', catchErr(async (req, res) => {
    const builds = await Build.find({})
    res.render('pages/index', {
        builds
    });
}))

router.get('/new', isAuth, catchErr(async (req, res) => {
    const builds = await Build.find({})
    res.render('pages/new', {
        builds
    })
}))

// New build route
router.post('/', isAuth, validateBuilds, catchErr(async (req, res) => {
    const builds = new Build(req.body.pages)
    builds.author = req.user._id
    await builds.save()
    req.flash('success', 'New build posted.')

    res.redirect(`/pages/${builds._id}`)
}))

// Build show 
router.get('/:id', catchErr(async (req, res) => {
    // pass in id from req . -> params -> .id
    const builds = await Build.findById(req.params.id).populate('comments').populate('author')
    console.log(builds.author)
    if (!builds) {
        req.flash('error', 'Error: Cannot find that build.')
        return res.redirect('/pages')
    }
    res.render('pages/show', {
        builds
    })
}))

// Edit route 
router.get('/:id/edit', isAuth, validateBuilds, catchErr(async (req, res) => {
    const builds = await Build.findById(req.params.id)
    res.render('pages/edit', {
        builds
    })
}))

// Edit put request
router.put('/:id', isAuth, validateBuilds, catchErr(async (req, res) => {
    const {
        id
    } = req.params
    // find the build
    const builds = await Build.findById(id)
    // check to see if logged in user owns this build
    if (!builds.author.equals(req.user._id)) {
        req.flash('error', 'Permission denied, you can\'t edit this build.')
        return res.redirect(`/pages/${id}`)
    }
    // if loggen in user does own build / then update
    const build = await Build.findByIdAndUpdate(id, {
        ...req.body.pages
    })
    res.redirect(`/pages/${builds._id}`)
}))

// Delete a build post
router.post('/:id', isAuth, catchErr(async (req, res) => {
    const {
        id
    } = req.params
    await Build.findByIdAndDelete(id)
    res.redirect(`/pages`)
}))

module.exports = router