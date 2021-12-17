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
const {
    storage
} = require('../cloud')
const multer = require('multer')
const upload = multer({
    storage
})

// Pages routes from controllers
router.route('/')

    .get(catchErr(pages.index))
    // New build route
    .post(isAuth, validateBuilds, upload.array('image'), catchErr(pages.createBuild))

router.get('/new', isAuth, catchErr(pages.newBuild))


router.route('/:id')
    // Build show 
    .get(catchErr(pages.displayBuild))

    // Edit put request
    .put(isAuth, isAuthor, upload.array('image'), validateBuilds, catchErr(pages.updateBuild))

    // Delete a build post
    .delete(catchErr(pages.destroyBuild))

// Edit route 
router.get('/:id/edit', isAuth, isAuthor, catchErr(pages.renderEdit))

module.exports = router