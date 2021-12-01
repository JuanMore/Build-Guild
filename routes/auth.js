const express = require('express')
const router = express.Router()
const User = require('../models/user')
const catchErr = require('../helpers/wrapAsync')
const passport = require('passport')

const auth = require('../controllers/auth')

router.get('/register', auth.registerUser)
router.post('/register', catchErr(auth.createUser))


router.get('/login', auth.renderLogin)


router.post('/login', passport.authenticate('local', {
    // passport auth - flash if failure
    failureFlash: true,
    // redirect
    failureRedirect: '/login'
    // if authenticated
}), auth.login)

router.get('/logout', auth.logout)

module.exports = router