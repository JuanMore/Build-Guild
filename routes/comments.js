const express = require('express')
const router = express.Router({
    mergeParams: true
})
const catchErr = require('../helpers/wrapAsync')
const errHandler = require('../helpers/errorhandling')

const Build = require('../models/build')
const Comment = require('../models/comments')


// pull our comment schema from schema.js
const {
    commentSchema
} = require('../schemas.js')

// Commment middleware/validation
const valComment = (req, res, next) => {
    const {
        error
    } = commentSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new errHandler(msg, 400)
    } else {
        next()
    }
}

// Comment Routes

router.post('/', valComment, catchErr(async (req, res) => {
    const builds = await Build.findById(req.params.id)
    const comment = new Comment(req.body.comment)
    // push comment to our comment schema
    builds.comments.push(comment)
    await comment.save()
    await builds.save()
    // redirect to show - display comment
    res.redirect(`/pages/${builds._id}`)
}))

router.delete('/:commentId', catchErr(async (req, res) => {
    const {
        id,
        commentId
    } = req.params
    // pull from comment array
    await Comment.findByIdAndUpdate(id, {
        $pull: {
            comment: commentId
        }
    })
    await Comment.findByIdAndDelete(commentId)
    res.redirect(`/pages/${id}`)
}))


module.exports = router