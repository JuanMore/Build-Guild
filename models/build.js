const {
    string
} = require('joi')
const mongoose = require('mongoose')
const {
    push
} = require('../seeds/custombuilds')

const Schema = mongoose.Schema

// create build schema
const buildSchema = new Schema({
    // Build name
    title: String,
    // Build Type
    type: String,
    status: String,
    image: String,
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

    // comments
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]

})

// export build schema
module.exports = mongoose.model('Build', buildSchema)