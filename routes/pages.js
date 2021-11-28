const express = require('express')
const router = express.Router()
const catchErr = require('../helpers/wrapAsync')
const Build = require('../models/build')
const User = require('../models/user')
const {
    isAuth,
    isAuthor,
    validateBuilds
} = require('../middleware')
const passport = require('passport')

// Pages routes
router.get('/', catchErr(async (req, res) => {
    const builds = await Build.find({})
    res.render('pages/index', {
        builds
    })
}))

router.get('/new', isAuth, catchErr(async (req, res) => {
    const builds = await Build.find({})
    builds.author = req.user.username
    console.log(builds.author)
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
    const builds = await Build.findById(req.params.id).populate({
        // nested populate to populate each author to their comment
        path: 'comments',
        populate: {
            path: 'author'
        }
    }).populate('author')
    if (!builds) {
        req.flash('error', 'Error: Cannot find that build. It may have been removed by the author or admin.')
        return res.redirect('/pages')
    }
    res.render('pages/show', {
        builds
    })
}))

// Edit route 
router.get('/:id/edit', isAuth, isAuthor, catchErr(async (req, res) => {
    const {
        id
    } = req.params
    const builds = await Build.findById(id).populate('author')
    if (!builds) {
        req.flas('error', 'Build not found.')
        return res.redirect('/pages')
    }
    res.render('pages/edit', {
        builds
    })
}))

// Edit put request
router.put('/:id', isAuth, isAuthor, validateBuilds, catchErr(async (req, res) => {
    const {
        id
    } = req.params
    // find the build
    // if user is authenticated / then update
    const builds = await Build.findByIdAndUpdate(id, {
        ...req.body.pages
    })
    res.redirect(`/pages/${builds._id}`)
}))

// Delete a build post
router.delete('/:id', catchErr(async (req, res) => {
    const {
        id
    } = req.params
    await Build.findByIdAndDelete(id)
    res.redirect(`/pages`)
}))

module.exports = router