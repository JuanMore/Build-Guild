const mongoose = require('mongoose')
const Schema = mongoose.Schema

const passwordLocalmongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.plugin(passwordLocalmongoose)

module.exports = mongoose.model('User', userSchema)