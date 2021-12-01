const Build = require('../models/build')


module.exports.index = async (req, res) => {
    const builds = await Build.find({})
    res.render('pages/index', {
        builds
    })
}

module.exports.newBuild = async (req, res) => {
    const builds = await Build.find({})
    builds.author = req.user.username
    console.log(builds.author)
    res.render('pages/new', {
        builds
    })
}

module.exports.createBuild = async (req, res) => {
    const builds = new Build(req.body.pages)
    builds.images =
        // map over array of images and add them to build
        req.files.map(f => ({
            // only take path and filename and puts that into an array n. images
            url: f.path,
            filename: f.filename
        }))
    builds.author = req.user._id
    await builds.save()
    console.log(builds)
    req.flash('success', 'New build posted.')

    res.redirect(`/pages/${builds._id}`)
}

module.exports.displayBuild = async (req, res) => {
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
}

module.exports.renderEdit = async (req, res) => {
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
}

module.exports.updateBuild = async (req, res) => {
    const {
        id
    } = req.params
    // find the build
    // if user is authenticated / then update
    const builds = await Build.findByIdAndUpdate(id, {
        ...req.body.pages
    })
    res.redirect(`/pages/${builds._id}`)
}

module.exports.destroyBuild = async (req, res) => {
    const {
        id
    } = req.params
    await Build.findByIdAndDelete(id)
    res.redirect(`/pages`)
}