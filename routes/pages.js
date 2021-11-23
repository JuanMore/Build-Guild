const express = require('express')
const router = express.Router()
const catchErr = require('../helpers/wrapAsync')
const errHandler = require('../helpers/errorhandling')
const Build = require('../models/build')

const {
    buildSchema,
} = require('../schemas.js')

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

router.get('/new', catchErr(async (req, res) => {
    const builds = await Build.find({})
    res.render('pages/new', {
        builds
    })
}))


router.post('/', validateBuilds, catchErr(async (req, res) => {
    const builds = new Build(req.body.pages)
    await builds.save()
    req.flash('success', 'New build posted.')

    res.redirect(`/pages/${builds._id}`)
}))

router.get('/:id', catchErr(async (req, res) => {
    // pass in id from req . -> params -> .id
    const builds = await Build.findById(req.params.id).populate('comments')
    if (!builds) {
        req.flash('error', 'Error: Cannot find that build.')
        return res.redirect('/pages')
    }
    res.render('pages/show', {
        builds
    })
}))


router.get('/:id/edit', validateBuilds, catchErr(async (req, res) => {
    const builds = await Build.findById(req.params.id)
    res.render('pages/edit', {
        builds
    })
}))

router.put('/:id', validateBuilds, catchErr(async (req, res) => {
    const {
        id
    } = req.params
    const builds = await Build.findByIdAndUpdate(id, {
        ...req.body.pages
    })
    res.redirect(`/pages/${builds._id}`)
}))

router.post('/:id', catchErr(async (req, res) => {
    const {
        id
    } = req.params
    await Build.findByIdAndDelete(id)
    res.redirect(`/pages`)
}))

module.exports = router