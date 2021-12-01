const Build = require('../models/build')
const Comment = require('../models/comments')


module.exports.createComment = async (req, res) => {
    const builds = await Build.findById(req.params.id)
    const comment = new Comment(req.body.comment)
    comment.author = req.user._id
    // push comment to our comment schema
    builds.comments.push(comment)
    await comment.save()
    await builds.save()
    // redirect to show - display comment
    res.redirect(`/pages/${builds._id}`)
}

module.exports.destroyComment = async (req, res) => {
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
}