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
router.route('/')

    .get(catchErr(pages.index))
    // New build route
    .post(isAuth, validateBuilds, catchErr(pages.createBuild))

router.get('/new', isAuth, catchErr(pages.newBuild))


router.route('/:id')
    // Build show 
    .get(catchErr(pages.displayBuild))

    // Delete a build post
    .delete(catchErr(pages.destroyBuild))

    // Edit put request
    .put(isAuth, isAuthor, validateBuilds, catchErr(pages.updateBuild))

// Edit route 
router.get('/:id/edit', isAuth, isAuthor, catchErr(pages.renderEdit))

module.exports = router