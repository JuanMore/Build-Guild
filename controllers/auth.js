const passport = require('passport')

const User = require('../models/user')

module.exports.registerUser = (req, res) => {
    res.render('auth/register')
}

module.exports.createUser = async (req, res) => {
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
        //register user save to db and hash password 
        const newUser = await User.register(user, password)
        // if err return next(err) - log that user in
        req.login(newUser, err => {
            if (err) return next(err)
            // otherwise
            req.flash('success', `Welcome to Build Guild, ${user.username}.`)
            res.redirect('/pages')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('auth/login')
}

module.exports.login = (req, res) => {
    req.flash('success', `Welcome back!`)
    const redirectUrl = req.session.returnTo || '/pages'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logout()
    res.redirect('/pages')
}