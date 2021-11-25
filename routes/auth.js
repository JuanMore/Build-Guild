const express = require('express')
const router = express.Router()
const User = require('../models/user')
const catchErr = require('../helpers/wrapAsync')
const passport = require('passport')

router.get('/register', (req, res) => {
    res.render('auth/register')
})
router.post('/register', catchErr(async (req, res) => {
    try {
        const {
            email,
            username,
            password
        } = req.body
        const user = new User({
            email,
            username
        })
        const newUser = await User.register(user, password)
        req.login(newUser, err => {
            if (err) return next(err)
            req.flash('success', `Welcome to Build Guild, ${user.username}.`)
            res.redirect('/pages')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}))


router.get('/login', (req, res) => {
    res.render('auth/login')
})


router.post('/login', passport.authenticate('local', {
    // passport auth - flash if failure
    failureFlash: true,
    // redirect
    failureRedirect: '/login'
    // if authenticated
}), (req, res) => {
    req.flash('success', `Welcome back!`)
    res.redirect('/pages')
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/pages')
})

module.exports = router