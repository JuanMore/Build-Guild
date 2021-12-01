const express = require('express')
const router = express.Router()
// controllers directory
const pages = require('../controllers/pages')
const catchErr = require('../helpers/wrapAsync')
const Build = require('../models/build')
const User = require('../models/user')
const {
    isAuth,
    isAuthor,
    validateBuilds
} = require('../middleware')
const passport = require('passport')

// Pages routes from controllers
router.get('/', catchErr(pages.index))

router.get('/new', isAuth, catchErr(pages.newBuild))

// New build route
router.post('/', isAuth, validateBuilds, catchErr(pages.createBuild))

// Build show 
router.get('/:id', catchErr(pages.displayBuild))

// Edit route 
router.get('/:id/edit', isAuth, isAuthor, catchErr(pages.renderEdit))

// Edit put request
router.put('/:id', isAuth, isAuthor, validateBuilds, catchErr(pages.updateBuild))

// Delete a build post
router.delete('/:id', catchErr(pages.destroyBuild))

module.exports = router