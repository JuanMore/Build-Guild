const mongoose = require('mongoose')
const builders = require('./custombuilds')
const {
    descriptors,
    adjective
} = require('./seedHelpers')
const Build = require('../models/build')

// Connect to mongoose
mongoose.connect('mongodb://localhost:27017/BuildGuild')

const db = mongoose.connection

// mongoose error handling
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)];

// function seedDB
const seedDb = async () => {
    // start by clearing all
    await Build.deleteMany({})
    // loop through array - custombuilds.js
    for (let i = 0; i < 10; i++) {
        // get random - 10 'profiles'
        const random3 = Math.floor(Math.random() * 3)
        // set new profiles from our Build model
        const profile = new Build({
            author: '619bd5276ff4cc4f4c93e09c',
            user: `${builders[random3].user}`,
            description: `${builders[random3].description}`,
            title: `${sample(descriptors)}: ${sample(adjective)}`,
            // seeds images - source from unsplash
            images: [{
                    url: 'https://res.cloudinary.com/moreno-cloud/image/upload/v1638344957/BuildGuild/qncwcqldki1qbjcedl2f.jpg',
                    filename: 'BuildGuild/qncwcqldki1qbjcedl2f',
                },
                {
                    url: 'https://res.cloudinary.com/moreno-cloud/image/upload/v1638344957/BuildGuild/nbrzjphf2rg0mrujph7l.jpg',
                    filename: 'BuildGuild/nbrzjphf2rg0mrujph7l',
                },
                {
                    url: 'https://res.cloudinary.com/moreno-cloud/image/upload/v1638344957/BuildGuild/ts47kr1fu3jwxtemyyo2.jpg',
                    filename: 'BuildGuild/ts47kr1fu3jwxtemyyo2',
                },
                {
                    url: 'https://res.cloudinary.com/moreno-cloud/image/upload/v1638344957/BuildGuild/mcev5urpryxp8ooaiyrl.jpg',
                    filename: 'BuildGuild/mcev5urpryxp8ooaiyrl',
                }
            ]
        })
        // save in mongo
        await profile.save()
    }

}

// returns promise - close connectin
seedDb().then(() => {
    mongoose.connection.close()
})