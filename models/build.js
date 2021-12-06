const {
    string
} = require('joi')
const mongoose = require('mongoose')
const {
    push
} = require('../seeds/custombuilds')

const Schema = mongoose.Schema

const ImageSchema = new Schema({
    url: String,
    filename: String
})

// schema derived from stored url
ImageSchema.virtual('thumbnail').get(function () {
    // access image url - replace and add w-200
    return this.url.replace('/upload', '/upload/w_200')
})
// create build schema
const buildSchema = new Schema({
    // Build name
    title: String,
    // Build Type
    type: String,
    status: String,
    images: [ImageSchema],
    // User name
    user: String,
    // build description
    description: String,
    rgb: String,
    // Hardware
    cooling: String,
    // size: String,
    cpu: String,
    motherboard: String,
    memory: String,
    graphics: String,
    storage: String,
    psu: String,
    case: String,
    // author
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    // comments
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

// export build schema
module.exports = mongoose.model('Build', buildSchema)