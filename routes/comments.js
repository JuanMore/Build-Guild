const express = require('express')
const router = express.Router({
    mergeParams: true
})
const catchErr = require('../helpers/wrapAsync')
const errHandler = require('../helpers/errorhandling')

const Build = require('../models/build')
const Comment = require('../models/comments')
const {
    valComment,
    isAuth,
    commentAuth
} = require('../middleware')

// Comment Routes
router.post('/', isAuth, valComment, catchErr(async (req, res) => {
    const builds = await Build.findById(req.params.id)
    const comment = new Comment(req.body.comment)
    comment.author = req.user._id
    // push comment to our comment schema
    builds.comments.push(comment)
    await comment.save()
    await builds.save()
    // redirect to show - display comment
    res.redirect(`/pages/${builds._id}`)
}))

router.delete('/:commentId', isAuth, commentAuth, catchErr(async (req, res) => {
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