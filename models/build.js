const mongoose = require('mongoose')

const Schema = mongoose.Schema

const buildSchema = new Schema({
    title: String,
    user: String,
    description: String
})

module.exports = mongoose.model('Build', buildSchema)