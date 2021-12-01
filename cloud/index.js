// imports
const cloudinary = require('cloudinary').v2
const {
    CloudinaryStorage
} = require('multer-storage-cloudinary')

// config keys
cloudinary.config({
    cloud_name: process.env.CLOUD,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

// instantiate an instance of cloud storage
const storage = new CloudinaryStorage({
    // set up instance in file
    cloudinary,
    params: {
        // upload to this folder
        folder: 'BuildGuild',
        // allowed formats for upload images
        allowedFormats: ['jpg', 'png', 'jpeg']
    }
})


module.exports = {
    cloudinary,
    storage
}