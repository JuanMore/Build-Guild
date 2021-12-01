const express = require('express')
const router = express.Router({
    mergeParams: true
})
const catchErr = require('../helpers/wrapAsync')
const errHandler = require('../helpers/errorhandling')
const comments = require('../controllers/comments')

const Build = require('../models/build')
const Comment = require('../models/comments')
const {
    valComment,
    isAuth,
    commentAuth
} = require('../middleware')

// Comment Routes
router.post('/', isAuth, valComment, catchErr(comments.createComment))

router.delete('/:commentId', isAuth, commentAuth, catchErr(comments.destroyComment))


module.exports = router