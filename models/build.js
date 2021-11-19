const {
    string
} = require('joi')
const mongoose = require('mongoose')

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
    wrap: String,
    cooling: String,
    size: String,

})

// export build schema
module.exports = mongoose.model('Build', buildSchema)