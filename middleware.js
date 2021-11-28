const {
    buildSchema
} = require('./schemas.js')
const errHandler = require('./helpers/errorhandling')
const Build = require('./models/build')

module.exports.isAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    } else {
        next();
    }
}


module.exports.validateBuilds = (req, res, next) => {
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


module.exports.isAuthor = async (req, res, next) => {
    const {
        id
    } = req.params
    const builds = await Build.findById(id)
    // check to see if logged in user owns this build
    if (!builds.author.equals(req.user._id)) {
        req.flash('error', 'Permission denied, you can\'t edit this build.')
        return res.redirect(`/pages/${id}`)
    }
    next()
}