const express = require('express')
const router = express.Router()
const User = require('../models/user')
const catchErr = require('../helpers/wrapAsync')
const passport = require('passport')

const auth = require('../controllers/auth')

router.route('/register')
    .get(auth.registerUser)
    .post(catchErr(auth.createUser))

router.route('/login')
    .get(auth.renderLogin)
    .post(passport.authenticate('local', {
        // passport auth - flash if failure
        failureFlash: true,
        // redirect
        failureRedirect: '/login'
        // if authenticated
    }), auth.login)

router.get('/logout', auth.logout)

module.exports = router